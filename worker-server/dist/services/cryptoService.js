"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishUpdate = void 0;
const nats_1 = require("nats");
const publishUpdate = async () => {
    try {
        const nc = await (0, nats_1.connect)({ servers: process.env.NATS_URL || 'nats://localhost:4222' });
        console.log('Connected to NATS');
        const message = { trigger: 'update' };
        nc.publish('crypto.update', JSON.stringify(message));
        console.log('Published update event');
        await nc.drain();
    }
    catch (error) {
        console.error('Error publishing to NATS:', error);
        throw error;
    }
};
exports.publishUpdate = publishUpdate;
