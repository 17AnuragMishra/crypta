import { connect, StringCodec, credsAuthenticator } from 'nats';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

interface UpdateMessage {
  trigger: 'update';
}

async function startWorker() {
  let nc: any;
  try {
    const credsPath = join(__dirname, '../creds/crypto-stats.creds');
    console.log('Reading creds from:', credsPath);
    const creds = readFileSync(credsPath);
    console.log('Creds loaded, length:', creds.length);

    nc = await connect({
      servers: process.env.NATS_URL || 'nats://localhost:4222',
      authenticator: credsAuthenticator(creds),
      debug: true,
    });
    console.log('Connected to NATS');

    const sc = StringCodec();

    const publishUpdate = async (): Promise<void> => {
      try {
        const message: UpdateMessage = { trigger: 'update' };
        nc.publish('crypto.update', sc.encode(JSON.stringify(message)));
        console.log('Published update event');
      } catch (error) {
        console.error('Error publishing to NATS:', error);
      }
    };

    cron.schedule('*/15 * * * *', async () => {
      console.log('Running scheduled crypto update');
      await publishUpdate();
    });

    console.log('Worker Server running');
  } catch (error) {
    console.error('Error starting worker:', error);
    process.exit(1);
  }
}

startWorker();