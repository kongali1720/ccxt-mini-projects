const ccxt = require('ccxt');

const API_KEY = 'ISI_API_KEY_KAMU';
const API_SECRET = 'ISI_API_SECRET_KAMU';

const symbol = 'BTC/USDT';
const amount = 0.001;

// Target strategi
const targetBuyPrice = 25000;
const targetSellPrice = 27000;

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

            console.log(`📈 Harga Sekarang: ${currentPrice} USDT`);

            if (currentPrice <= targetBuyPrice) {
                console.log(`🚀 Beli BTC karena harga di bawah ${targetBuyPrice}`);
                const order = await exchange.createMarketBuyOrder(symbol, amount);
                console.log(`✅ Market BUY order dibuat:`, order);
                break; // stop setelah beli
            }

            if (currentPrice >= targetSellPrice) {
                console.log(`💰 Jual BTC karena harga di atas ${targetSellPrice}`);
                const order = await exchange.createMarketSellOrder(symbol, amount);
                console.log(`✅ Market SELL order dibuat:`, order);
                break; // stop setelah jual
            }

            await new Promise(resolve => setTimeout(resolve, 5000)); // cek setiap 5 detik
        }

        console.log('🔥 Bot selesai eksekusi');

    } catch (err) {
        console.error('⚠️ Error:', err.message || err);
    }
}

autoTrade();
