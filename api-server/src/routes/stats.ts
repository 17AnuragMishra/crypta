import { Request, Response, Router } from 'express';
import Crypto, { ICrypto } from '../models/Crypto';

const router = Router();

const VALID_COINS = ['bitcoin', 'ethereum', 'matic-network'] as const;

interface StatsResponse {
  price: number;
  marketCap: number;
  '24hChange': number;
}

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { coin } = req.query;

  if (!coin || typeof coin !== 'string' || !VALID_COINS.includes(coin as any)) {
    res.status(400).json({ error: 'Invalid or missing `coin` query parameter. Must be one of: bitcoin, ethereum, matic-network.' });
    return;
  }

  try {
    const latestCrypto: ICrypto | null = await Crypto.findOne({ coin })
      .sort({ timestamp: -1 })
      .exec();

    if (!latestCrypto) {
      res.status(404).json({ error: `No data found for coin: ${coin}` });
      return;
    }

    const response: StatsResponse = {
      price: latestCrypto.price_in_usd,
      marketCap: latestCrypto.market_cap_in_usd,
      '24hChange': latestCrypto.change_24h,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

export default router;