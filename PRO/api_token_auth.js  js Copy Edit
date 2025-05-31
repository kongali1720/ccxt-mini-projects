const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3003;

const API_TOKENS = ['tokenRahasia123', 'tokenLain456'];

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
});
