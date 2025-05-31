const ccxt = require('ccxt');
const express = require('express');
const app = express();
const port = 3002;

const WALLETS = [
  { apiKey: 'API_KEY_1', secret: 'API_SECRET_1' },
  { apiKey: 'API_KEY_2', secret: 'API_SECRET_2' },
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
});
