import express, { Express } from 'express';
import { connectDB } from './db';
import mainRouter from './routes/index';
import { fetchCryptoData } from './utils/CoinGeckoClient';
import { connect } from 'nats';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use('/api/v1', mainRouter);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

connectDB();

// NATS Subscription
const setupNats = async (): Promise<void> => {
  try {
    const nc = await connect({ servers: process.env.NATS_URL || 'nats://localhost:4222' });
    console.log('Connected to NATS');

    const sub = nc.subscribe('crypto.update');
    for await (const msg of sub) {
      console.log('Received NATS message:', msg.data);
      await fetchCryptoData();
    }
  } catch (error) {
    console.error('NATS connection error:', error);
  }
};

setupNats();

const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});