"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cryptoSchema = new mongoose_1.Schema({
    coin: {
        type: String,
        required: true,
        enum: ['bitcoin', 'ethereum', 'matic-network'],
    },
    price_in_usd: { type: Number, required: true },
    market_cap_in_usd: { type: Number, required: true },
    change_24h: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});
const Crypto = (0, mongoose_1.model)('Crypto', cryptoSchema);
exports.default = Crypto;
