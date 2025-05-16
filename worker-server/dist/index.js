"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nats_1 = require("nats");
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const publishUpdate = async () => {
    try {
        const nc = await (0, nats_1.connect)({ servers: process.env.NATS_URL || 'nats://localhost:4222' });
        console.log('Connected to NATS');
        const message = { trigger: 'update' };
        nc.publish('crypto.update', JSON.stringify(message));
        console.log('Published update event');
        await nc.drain();
    }
    catch (error) {
        console.error('Error publishing to NATS:', error);
    }
};
node_cron_1.default.schedule('*/15 * * * *', async () => {
    console.log('Running scheduled crypto update');
    await publishUpdate();
});
console.log('Worker Server running');
