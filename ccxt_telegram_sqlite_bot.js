# Dockerfile
FROM node:18-alpine
WORKDIR /app

COPY . .

RUN npm install ccxt sqlite3 node-telegram-bot-api

CMD ["node", "ccxt_telegram_sqlite_bot.js"]
