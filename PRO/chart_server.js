// PRO/chart_server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.CHART_PORT || 3005;
const db = new sqlite3.Database('./trade_history.db');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/chart-data', (req, res) => {
  db.all('SELECT timestamp, price FROM trades ORDER BY timestamp DESC LIMIT 50', (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows.reverse());
  });
});

app.listen(port, () => {
  console.log(`📈 Chart server running at http://localhost:${port}`);
});
