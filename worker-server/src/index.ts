import { connect } from 'nats';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

interface UpdateMessage {
  trigger: 'update';
}

const publishUpdate = async (): Promise<void> => {
  try {
    const nc = await connect({ servers: process.env.NATS_URL || 'nats://localhost:4222' });
    console.log('Connected to NATS');

    const message: UpdateMessage = { trigger: 'update' };
    nc.publish('crypto.update', JSON.stringify(message));
    console.log('Published update event');

    await nc.drain();
  } catch (error) {
    console.error('Error publishing to NATS:', error);
  }
};

cron.schedule('*/15 * * * *', async () => {
  console.log('Running scheduled crypto update');
  await publishUpdate();
});

console.log('Worker Server running');