const ccxt = require('ccxt');
const TelegramBot = require('node-telegram-bot-api');

const API_KEY = 'API_KEY_KAMU';
const API_SECRET = 'API_SECRET_KAMU';
const TELEGRAM_TOKEN = 'TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'CHAT_ID_KAMU';
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

runLoop();
