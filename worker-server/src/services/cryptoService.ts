import { connect, type NatsConnection } from 'nats';

interface UpdateMessage {
  trigger: 'update';
}

export const publishUpdate = async (): Promise<void> => {
  try {
    const nc: NatsConnection = await connect({ servers: process.env.NATS_URL || 'nats://localhost:4222' });
    console.log('Connected to NATS');

    const message: UpdateMessage = { trigger: 'update' };
    nc.publish('crypto.update', JSON.stringify(message));
    console.log('Published update event');

    await nc.drain();
  } catch (error) {
    console.error('Error publishing to NATS:', error);
    throw error;
  }
};