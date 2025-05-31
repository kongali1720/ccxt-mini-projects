const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { Parser } = require('json2csv');

const app = express();
const port = 3001;

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
});
