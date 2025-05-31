const ccxt = require('ccxt');

const API_KEY = 'ISI_API_KEY_KAMU';
const API_SECRET = 'ISI_API_SECRET_KAMU';

async function main() {
    const exchange = new ccxt.binance({
        apiKey: API_KEY,
        secret: API_SECRET,
        enableRateLimit: true,
    });

    const symbol = 'BTC/USDT';
    const amount = 0.001; // Jumlah BTC
    const buyPrice = 25000;
    const sellPrice = 26000;

    try {
        console.log(`Pasang LIMIT BUY ${amount} BTC di ${buyPrice} USDT...`);
        const buyOrder = await exchange.createLimitBuyOrder(symbol, amount, buyPrice);
        console.log(`✅ Order BUY ID: ${buyOrder.id}`);

        console.log(`Pasang LIMIT SELL ${amount} BTC di ${sellPrice} USDT...`);
        const sellOrder = await exchange.createLimitSellOrder(symbol, amount, sellPrice);
        console.log(`✅ Order SELL ID: ${sellOrder.id}`);

        // Tunggu 10 detik
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Cek status order
        console.log(`\n📡 Cek status order...`);
        const buyStatus = await exchange.fetchOrder(buyOrder.id, symbol);
        const sellStatus = await exchange.fetchOrder(sellOrder.id, symbol);

        console.log(`Status BUY: ${buyStatus.status}`);
        console.log(`Status SELL: ${sellStatus.status}`);

        // Batalin jika belum tereksekusi
        if (buyStatus.status !== 'closed') {
            console.log('❌ Cancel BUY order...');
            await exchange.cancelOrder(buyOrder.id, symbol);
        }

        if (sellStatus.status !== 'closed') {
            console.log('❌ Cancel SELL order...');
            await exchange.cancelOrder(sellOrder.id, symbol);
        }

        console.log('✅ Selesai!');

    } catch (err) {
        console.error('⚠️ Error:', err.message || err);
    }
}

main();
