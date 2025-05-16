import axios from 'axios';
import Crypto from '../models/Crypto';

interface CryptoData {
  id: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const BASE_URL = 'https://api.coingecko.com/api/v3';
const COINS = ['bitcoin', 'ethereum', 'matic-network'];

export const fetchCryptoData = async (): Promise<void> => {
  try {
    const response = await axios.get<CryptoData[]>(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: COINS.join(','),
      },
    });

    const cryptocurrencies = response.data;

    for (const crypto of cryptocurrencies) {
      const { id, current_price, market_cap, price_change_percentage_24h } = crypto;

      const newCryptoData = new Crypto({
        coin: id,
        price_in_usd: current_price,
        market_cap_in_usd: market_cap,
        change_24h: price_change_percentage_24h,
      });

      await newCryptoData.save();
      console.log(`Saved data for ${id}`);
    }
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
};