// PRO/email_report.js
require('dotenv').config();
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const { Parser } = require('json2csv');
const cron = require('node-cron');
const fs = require('fs');

const db = new sqlite3.Database('./trade_history.db');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

function sendReport() {
  db.all('SELECT * FROM trades ORDER BY timestamp DESC LIMIT 100', (err, rows) => {
    if (err) return console.error('DB Error:', err.message);
    
    const csv = new Parser().parse(rows);
    const filePath = './weekly_report.csv';
    fs.writeFileSync(filePath, csv);

    transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: '📊 Weekly Trade Report',
      text: 'Attached is your weekly trade report.',
      attachments: [{ filename: 'weekly_report.csv', path: filePath }]
    }, (error, info) => {
      if (error) return console.error('✉️ Error:', error.message);
      console.log('✅ Report sent:', info.response);
    });
  });
}

// Every Monday 9 AM
cron.schedule('0 9 * * 1', sendReport);
console.log('⏰ Email report scheduled every Monday 9AM');
