"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const index_1 = __importDefault(require("./routes/index"));
const CoinGeckoClient_1 = require("./utils/CoinGeckoClient");
const nats_1 = require("nats");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', index_1.default);
app.use((req, res) => {
    res.status(404).send('Route not found');
});
(0, db_1.connectDB)();
// NATS Subscription
const setupNats = async () => {
    try {
        const nc = await (0, nats_1.connect)({ servers: process.env.NATS_URL || 'nats://localhost:4222' });
        console.log('Connected to NATS');
        const sub = nc.subscribe('crypto.update');
        for await (const msg of sub) {
            console.log('Received NATS message:', msg.data);
            await (0, CoinGeckoClient_1.fetchCryptoData)();
        }
    }
    catch (error) {
        console.error('NATS connection error:', error);
    }
};
setupNats();
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
