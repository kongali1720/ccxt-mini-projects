// FILE: setup_PRO_env.js

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const folder = 'PRO';
if (!fs.existsSync(folder)) fs.mkdirSync(folder);

const files = {
  'auto_sell_loop.js': `const ccxt = require('ccxt');
const TelegramBot = require('node-telegram-bot-api');

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const SYMBOL = 'BTC/USDT';
const AMOUNT = 0.001;
const BUY_PRICE = 25000;
const SELL_PRICE = 27000;

const exchange = new ccxt.binance({ apiKey: API_KEY, secret: API_SECRET });
const bot = new TelegramBot(TELEGRAM_TOKEN);

function sendNotif(message) {
  bot.sendMessage(TELEGRAM_CHAT_ID, `📢 ${message}`);
  console.log(`[TELEGRAM] ${message}`);
}

async function runLoop() {
  while (true) {
    try {
      const ticker = await exchange.fetchTicker(SYMBOL);
      const price = ticker.last;
      console.log(`Harga: ${price}`);

      if (price <= BUY_PRICE) {
        await exchange.createMarketBuyOrder(SYMBOL, AMOUNT);
        sendNotif(`✅ BUY ${AMOUNT} ${SYMBOL} di ${price}`);
      } else if (price >= SELL_PRICE) {
        await exchange.createMarketSellOrder(SYMBOL, AMOUNT);
        sendNotif(`💰 SELL ${AMOUNT} ${SYMBOL} di ${price}`);
      } else {
        console.log('Harga belum mencapai target BUY/SELL');
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (err) {
      sendNotif(`⚠️ ERROR: ${err.message}`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

runLoop();`,

  'export_csv.js': `const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { Parser } = require('json2csv');

const app = express();
const port = process.env.CSV_EXPORT_PORT || 3001;

const db = new sqlite3.Database('./trade_history.db');

app.get('/export-csv', (req, res) => {
  db.all('SELECT * FROM trades ORDER BY timestamp DESC', (err, rows) => {
    if (err) return res.status(500).send(err.message);

    const fields = ['id', 'type', 'amount', 'price', 'timestamp'];
    const parser = new Parser({ fields });
    const csv = parser.parse(rows);

    res.header('Content-Type', 'text/csv');
    res.attachment('trade_history.csv');
    res.send(csv);
  });
});

app.listen(port, () => {
  console.log(`CSV Exporter running on http://localhost:${port}/export-csv`);
});`,

  'multi_wallet_viewer.js': `const ccxt = require('ccxt');
const express = require('express');
const app = express();
const port = process.env.WALLET_VIEWER_PORT || 3002;

const WALLETS = [
  { apiKey: process.env.API_KEY_1, secret: process.env.API_SECRET_1 },
  { apiKey: process.env.API_KEY_2, secret: process.env.API_SECRET_2 },
];

app.get('/api/wallets-balance', async (req, res) => {
  try {
    const balances = [];
    for (const wallet of WALLETS) {
      const ex = new ccxt.binance({ apiKey: wallet.apiKey, secret: wallet.secret });
      const balance = await ex.fetchBalance();
      balances.push({
        walletId: wallet.apiKey.slice(-4),
        balanceUSDT: balance.total['USDT'] || 0,
      });
    }
    res.json(balances);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Multi-wallet viewer running on http://localhost:${port}`);
});`,

  'api_token_auth.js': `const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.API_AUTH_PORT || 3003;

const API_TOKENS = process.env.API_TOKENS.split(',');

const db = new sqlite3.Database('./trade_history.db');

function tokenAuth(req, res, next) {
  const token = req.headers['x-api-token'];
  if (!token || !API_TOKENS.includes(token)) {
    return res.status(403).json({ error: 'Forbidden. Token invalid.' });
  }
  next();
}

app.get('/api/trades', tokenAuth, (req, res) => {
  db.all('SELECT * FROM trades ORDER BY timestamp DESC LIMIT 20', (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`API-token auth server running on http://localhost:${port}`);
});`
};

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(folder, file), content);
}

fs.writeFileSync('.env', `# Binance API
API_KEY=your_binance_api_key
API_SECRET=your_binance_api_secret

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# CSV Exporter
CSV_EXPORT_PORT=3001

# Multi Wallet Viewer
API_KEY_1=your_wallet1_api_key
API_SECRET_1=your_wallet1_secret
API_KEY_2=your_wallet2_api_key
API_SECRET_2=your_wallet2_secret
WALLET_VIEWER_PORT=3002

# API Token Auth
API_TOKENS=tokenRahasia123,tokenLain456
API_AUTH_PORT=3003
`);

console.log('✅ Folder PRO, file fitur, dan .env sudah dibuat lengkap!');
