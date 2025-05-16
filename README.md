# KoinX Backend Project

A server-side application built with **Node.js**, **TypeScript**, **Express**, and **MongoDB** to fetch, store, and analyze cryptocurrency statistics. This project includes background jobs for periodic updates and RESTful APIs for retrieving data.

**Live Link:** https://crypta-be.vercel.app/

## Features

- Fetches and stores the latest cryptocurrency stats (price, market cap, 24-hour change) for Bitcoin, Ethereum, and Matic every 2 hours in the background.
- Provides an API to retrieve the latest stats for a specified cryptocurrency ("/api/v1/stat?coin=bitcoin").
- Calculates the standard deviation of the price of a cryptocurrency from the last 100 records ("/api/v1/deviation?coin=bitcoin").
- Built using best practices for production-grade development.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or MongoDB Atlas)
- Package Manager (e.g., npm or yarn)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Lokendrakushwah12/crypta.git
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
src
├── models/
│   └── Crypto.ts
├── routes/
│   └── deviation.ts
│   └── index.ts
│   └── stats.ts
├── utils/
│   └── CoinGeckoClient.ts
├── db.ts
└── index.ts
```

## Dependencies

- **axios**
- **dotenv**
- **express**
- **mongoose**
- **node-cron**
- **node-schedule**

## Contact

Let me know if you’d like further tweaks!

- Email: Lokendrakushwah8051@gmail.com
