# 🎉  CCXT 
---

<p align="center"> <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTYwNnR2bTNhd2w1d24yYmN1dTRjaTlib3BidWI2ZHY4cXMwbXQwbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DqiMTFxiXx0VaVZQbF/giphy.gif" width="300"/> </p>

---
# Halo, Sobat Koding!  

ini adalah Kumpulan mini project Python yang gak bikin ngantuk!  

Belajar sambil praktek langsung, cocok buat yang suka action daripada teori.  

Langsung eksekusi, langsung paham.

---

## 🚀 Project Terbaru Bagaimana CCXT bisa ambil harga Bitcoin dari Binance 

---

## ✅ 💻 Yuk kita sama sama Install dulu ccxt nya 🚀

    pip install ccxt

---

Cara pakai:

Simpan di file mini_ccxt.py

Kalau mau lihat saldo, buka di exchange = ccxt.binance({...}) lalu isi apiKey dan secret dengan API dari Binance-mu

Jalankan:


    python mini_ccxt.py

    python mini_bot_trading.py

Cara pakai:

    mini_bot_trading.js
    
Simpan sebagai mini_bot_trading.js

Isi API_KEY dan API_SECRET dengan milikmu

Jalankan:

    npm install ccxt

    node mini_bot_trading.js

    node auto_trade_live_price.js
    
---
📌 Cara Pasang:
---
1. Salin ccxt-bot.service ke:

        sudo nano /etc/systemd/system/ccxt-bot.service

2. Reload systemd:

        sudo systemctl daemon-reexec

3. Jalankan:

        sudo systemctl daemon-reload

4. Auto start saat boot:

        sudo systemctl start ccxt-bot

5. Cek status:

       sudo systemctl status ccxt-bot
    
---

📁 Log Tersimpan di:

    ./trade_log.txt
---
# Untuk 🐳 Build & Run Docker

# Dockerfile

FROM node:18-alpine
WORKDIR /app

COPY . .

RUN npm install ccxt sqlite3 node-telegram-bot-api

CMD ["node", "ccxt_telegram_sqlite_bot.js"]


    docker build -t ccxt-bot .

    docker run -d --name ccxt-bot ccxt-bot

---

# 🚀 untuk lihat Dashboard frontend 🚀 Sekarang buka:

    http://localhost:3000

---

#  Buat live chart:

  ✅ Sekarang buka 
    
    http://localhost:3000/chart.html 

dan nikmati grafik harga crypto real-time langsung dari CCXT

---

# ✅ Cara pakai:

👉  Simpan file di: 

    public/dashboard.html

Jalankan project-mu seperti biasa (node ccxt_telegram_sqlite_bot.js)

Akses dashboard di:

    http://localhost:3000/dashboard.html

---
# 🧠 Username dan Password Default:
Username: admin

Password: merahdarah1720

Kamu bisa ganti di bagian atas <script> sesuai keinginan:

    const ADMIN_USER = 'admin';
    const ADMIN_PASS = 'merahdarah1720';

3 ✅ Jalankan dan akses:
Letakkan file ini di folder public/admin.html

Jalankan bot-nya seperti biasa (node ccxt_telegram_sqlite_bot.js)

Akses dashboard admin:

    http://localhost:3000/admin.html

---

## ✅ Gaspol coding squad Indonesia! 🚀💻

Halo, Sobat Koding!  
Kumpulan mini project Python yang gak bikin ngantuk!  
Belajar sambil praktek langsung, cocok buat yang suka action daripada teori.  
Langsung eksekusi, langsung paham.

---

# 💡 Dukung aku agar tetap waras menulis script tengah malam...

[Buy Me a Coffee via PayPal](https://www.paypal.com/paypalme/bungtempong99)  
Support with ☕ so I can buy 🍜 and keep being 🧠!

---

# 🚀 🇮🇩 Let’s Connect Like Hackers

- GitHub: [kongali1720](https://github.com/kongali1720)  
- Email: [kongali1720@gmail.com](mailto:kongali1720@gmail.com)  
- Site: Coming soon — stay curious...

---

# ❤️❤❤️ INITIATING HUMANITY MODE for Down Syndrome ❤️❤❤️

🎯 Target Locked: Anak-anak Pejuang Down Syndrome  
📡 Status: Butuh Dukungan  
🧠 Response: Buka Hati + Klik Link = Satu Senyum Baru

> Mereka bukan berbeda — mereka dilahirkan untuk mengajarkan dunia tentang cinta yang murni dan kesabaran yang luar biasa.

<p align="center">
  <a href="https://mydonation4ds.github.io/" target="_blank">
    <img src="https://img.shields.io/badge/SUPPORT--NOW-%F0%9F%A7%A1-orange?style=for-the-badge&logo=heart" />
  </a>
</p>

🧡 "Karena jadi hacker hati bukan cuma soal kode... tapi juga soal peduli."  
🧠 "Ngoding boleh sambil senyum, asal jangan inject SQL sambil ngambek!"

---
