import { connect, StringCodec, credsAuthenticator } from 'nats';
import express from 'express';
import mongoose from 'mongoose';
import mainRouter from './routes';
import { fetchCryptoData } from './utils/CoinGeckoClient';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', mainRouter);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB.');

    const credsPath = join(__dirname, '../creds/crypto-stats.creds');
    console.log('Reading creds from:', credsPath);
    const creds = readFileSync(credsPath);
    console.log('Creds loaded, length:', creds.length);

    const nc = await connect({
      servers: process.env.NATS_URL,
      authenticator: credsAuthenticator(creds),
      debug: true,
    });
    console.log('Connected to NATS');

    const sc = StringCodec();
    const sub = nc.subscribe('crypto.update');
    for await (const msg of sub) {
      console.log('Received NATS message:', JSON.parse(sc.decode(msg.data)));
      await fetchCryptoData();
    }

    app.listen(port, () => {
      console.log(`Server is running on port ${port} http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();