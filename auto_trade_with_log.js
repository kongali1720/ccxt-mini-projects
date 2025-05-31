const ccxt = require('ccxt');
const fs = require('fs');

const API_KEY = 'ISI_API_KEY_KAMU';
const API_SECRET = 'ISI_API_SECRET_KAMU';

const symbol = 'BTC/USDT';
const amount = 0.001;
const targetBuyPrice = 25000;
const targetSellPrice = 27000;
const logFile = 'trade_log.txt';

function logToFile(message) {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, log);
    console.log(log.trim());
}

async function autoTrade() {
    const exchange = new ccxt.binance({
        apiKey: API_KEY,
        secret: API_SECRET,
        enableRateLimit: true,
    });

    try {
        while (true) {
            const ticker = await exchange.fetchTicker(symbol);
            const currentPrice = ticker.last;

            logToFile(`Harga sekarang: ${currentPrice} USDT`);

            if (currentPrice <= targetBuyPrice) {
                logToFile(`🚀 BUY trigger! Harga di bawah ${targetBuyPrice}`);
                const order = await exchange.createMarketBuyOrder(symbol, amount);
                logToFile(`✅ BUY order: ${JSON.stringify(order)}`);
                break;
            }

            if (currentPrice >= targetSellPrice) {
                logToFile(`💰 SELL trigger! Harga di atas ${targetSellPrice}`);
                const order = await exchange.createMarketSellOrder(symbol, amount);
                logToFile(`✅ SELL order: ${JSON.stringify(order)}`);
                break;
            }

            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        logToFile('🔥 Bot selesai eksekusi');

    } catch (err) {
        logToFile(`⚠️ ERROR: ${err.message || err}`);
    }
}

autoTrade();
