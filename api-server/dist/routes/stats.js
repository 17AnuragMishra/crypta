"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Crypto_1 = __importDefault(require("../models/Crypto"));
const router = (0, express_1.Router)();
const VALID_COINS = ['bitcoin', 'ethereum', 'matic-network'];
router.get('/', async (req, res) => {
    const { coin } = req.query;
    if (!coin || typeof coin !== 'string' || !VALID_COINS.includes(coin)) {
        res.status(400).json({ error: 'Invalid or missing `coin` query parameter. Must be one of: bitcoin, ethereum, matic-network.' });
        return;
    }
    try {
        const latestCrypto = await Crypto_1.default.findOne({ coin })
            .sort({ timestamp: -1 })
            .exec();
        if (!latestCrypto) {
            res.status(404).json({ error: `No data found for coin: ${coin}` });
            return;
        }
        const response = {
            price: latestCrypto.price_in_usd,
            marketCap: latestCrypto.market_cap_in_usd,
            '24hChange': latestCrypto.change_24h,
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'An error occurred while fetching the data.' });
    }
});
exports.default = router;
