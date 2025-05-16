"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCryptoData = void 0;
const axios_1 = __importDefault(require("axios"));
const Crypto_1 = __importDefault(require("../models/Crypto"));
const BASE_URL = 'https://api.coingecko.com/api/v3';
const COINS = ['bitcoin', 'ethereum', 'matic-network'];
const fetchCryptoData = async () => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                ids: COINS.join(','),
            },
        });
        const cryptocurrencies = response.data;
        for (const crypto of cryptocurrencies) {
            const { id, current_price, market_cap, price_change_percentage_24h } = crypto;
            const newCryptoData = new Crypto_1.default({
                coin: id,
                price_in_usd: current_price,
                market_cap_in_usd: market_cap,
                change_24h: price_change_percentage_24h,
            });
            await newCryptoData.save();
            console.log(`Saved data for ${id}`);
        }
    }
    catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error;
    }
};
exports.fetchCryptoData = fetchCryptoData;
