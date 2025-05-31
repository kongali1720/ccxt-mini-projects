// FILE: ccxt_telegram_sqlite_bot.js

const ccxt = require('ccxt');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const port = 3000;

// CONFIG
const API_KEY = 'ISI_API_KEY_KAMU';
const API_SECRET = 'ISI_API_SECRET_KAMU';
const TELEGRAM_TOKEN = 'ISI_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'ISI_CHAT_ID_KAMU';
const SYMBOL = 'BTC/USDT';
const AMOUNT = 0.001;
const BUY_PRICE = 25000;
const SELL_PRICE = 27000;

// INIT
const exchange = new ccxt.binance({ apiKey: API_KEY, secret: API_SECRET });
const bot = new TelegramBot(TELEGRAM_TOKEN);
const db = new sqlite3.Database('./trade_history.db');

// DB SETUP
function initDB() {
  db.run(`CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    amount REAL,
    price REAL,
    timestamp TEXT
  )`);
}

function logTrade(type, amount, price) {
  const timestamp = new Date().toISOString();
  db.run(`INSERT INTO trades (type, amount, price, timestamp) VALUES (?, ?, ?, ?)`,
    [type, amount, price, timestamp]);
}

function sendNotif(message) {
  bot.sendMessage(TELEGRAM_CHAT_ID, `📢 ${message}`);
  console.log(`[TELEGRAM] ${message}`);
}

// BOT
async function runBot() {
  initDB();
  while (true) {
    try {
      const ticker = await exchange.fetchTicker(SYMBOL);
      const price = ticker.last;
      console.log(`Harga: ${price}`);

      if (price <= BUY_PRICE) {
        const order = await exchange.createMarketBuyOrder(SYMBOL, AMOUNT);
        sendNotif(`✅ BUY ${AMOUNT} ${SYMBOL} di ${price}`);
        logTrade('BUY', AMOUNT, price);
        break;
      }

      if (price >= SELL_PRICE) {
        const order = await exchange.createMarketSellOrder(SYMBOL, AMOUNT);
        sendNotif(`💰 SELL ${AMOUNT} ${SYMBOL} di ${price}`);
        logTrade('SELL', AMOUNT, price);
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (e) {
      sendNotif(`⚠️ ERROR: ${e.message}`);
    }
  }
}

// API & HTML DASHBOARD
app.use(express.static('public'));

app.get('/api/trades', (req, res) => {
  db.all('SELECT * FROM trades ORDER BY timestamp DESC LIMIT 20', (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// LIVE PRICE ENDPOINT
app.get('/api/live-price', async (req, res) => {
  try {
    const ticker = await exchange.fetchTicker(SYMBOL);
    res.json({ price: ticker.last });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`📊 Dashboard: http://localhost:${port}`);
});

runBot();
