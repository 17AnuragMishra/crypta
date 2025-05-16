"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Crypto_1 = __importDefault(require("../models/Crypto"));
const router = (0, express_1.Router)();
const VALID_COINS = ['bitcoin', 'ethereum', 'matic-network'];
const calculateStandardDeviation = (numbers) => {
    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    const variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
    return Math.sqrt(variance);
};
router.get('/', async (req, res) => {
    const { coin } = req.query;
    if (!coin || typeof coin !== 'string' || !VALID_COINS.includes(coin)) {
        res.status(400).json({ error: 'Invalid or missing `coin` parameter. Must be one of: bitcoin, ethereum, matic-network.' });
        return;
    }
    try {
        const records = await Crypto_1.default.find({ coin })
            .sort({ timestamp: -1 })
            .limit(100);
        if (records.length === 0) {
            res.status(404).json({ error: `No records found for ${coin}.` });
            return;
        }
        const prices = records.map((record) => record.price_in_usd);
        const deviation = calculateStandardDeviation(prices);
        res.json({ deviation: parseFloat(deviation.toFixed(2)) });
    }
    catch (error) {
        console.error('Error fetching deviation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
