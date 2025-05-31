// PRO/websocket_server.js
require('dotenv').config();
const ccxt = require('ccxt');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.WS_PORT || 3004;

const exchange = new ccxt.binance();

setInterval(async () => {
  try {
    const ticker = await exchange.fetchTicker('BTC/USDT');
    const price = ticker.last;
    io.emit('priceUpdate', { symbol: 'BTC/USDT', price });
    console.log('📡 Emit:', price);
  } catch (err) {
    console.error('WS Error:', err.message);
  }
}, 3000);

server.listen(port, () => {
  console.log(`🔄 WebSocket running at http://localhost:${port}`);
});
