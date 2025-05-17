# KoinX Backend Project

A server-side application built with **Node.js**, **TypeScript**, **Express**, **Docker** and **MongoDB** to fetch, store, and analyze cryptocurrency statistics. This project includes background jobs for periodic updates and RESTful APIs for retrieving data.

## Features

-- This is the worker server for the cryptocurrency stats application, built with TypeScript. It runs a background job every 15 minutes to publish an event to NATS, triggering the API server to update crypto stats.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or MongoDB Atlas)
- [Docker](https://www.docker.com/get-started/) (Local)
- Package Manager (e.g., npm or yarn)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/crypta.git
   cd crypta
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the required variables such as:
     ```env
     MONGO_URI=<your-database-url>
     PORT=3000
     ```

4. Start the server:

   ```bash
   npm run dev
   ```

## Project Structure

```
crypto-stats/
├── api-server/
│   ├── src/
│   │   ├── models/Crypto.ts
│   │   ├── routes/deviation.ts
│   │   ├── routes/index.ts
│   │   ├── routes/stats.ts
│   │   ├── utils/CoinGeckoClient.ts
│   │   ├── db.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── README.md
├── worker-server/
│   ├── src/
│   │   ├── services/cryptoService.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── README.md
├── .gitignore
```

## Dependencies

- **axios**
- **dotenv**
- **express**
- **mongoose**
- **node-cron**
- **node-schedule**
and few more.

## Contact

Let me know if you’d like further tweaks!

- Email: anuragmishra0521@gmail.com