// PRO/dashboard_secure.js
require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.ADMIN_PORT || 3006;
const db = new sqlite3.Database('./users.db');

app.use(bodyParser.json());

db.run('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, role TEXT)');

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err || !row) return res.status(403).json({ error: 'Invalid login' });

    const token = jwt.sign({ username: row.username, role: row.role }, process.env.JWT_SECRET);
    res.json({ token });
  });
});

function auth(role) {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Unauthorized');
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      if (decoded.role !== role) return res.status(403).send('Forbidden');
      next();
    } catch (err) {
      res.status(403).send('Invalid token');
    }
  };
}

app.get('/admin/secret', auth('admin'), (req, res) => {
  res.send('🔐 Welcome Admin!');
});

app.listen(port, () => {
  console.log(`🔐 Role-based dashboard at http://localhost:${port}`);
});
