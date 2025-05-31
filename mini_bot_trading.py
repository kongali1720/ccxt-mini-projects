import ccxt
import time

# Ganti dengan API key dan secret kamu sendiri!
API_KEY = 'ISI_API_KEY_KAMU'
API_SECRET = 'ISI_API_SECRET_KAMU'

def main():
    exchange = ccxt.binance({
        'apiKey': API_KEY,
        'secret': API_SECRET,
        'enableRateLimit': True,
    })

    symbol = 'BTC/USDT'  # Pasangan trading
    amount = 0.001       # Jumlah BTC yang mau dibeli / dijual

    # Harga beli dan jual limit (contoh)
    buy_price = 25000    # USDT
    sell_price = 26000   # USDT

    print(f"Pasang order LIMIT BUY {amount} {symbol} di harga {buy_price} USDT...")
    buy_order = exchange.create_limit_buy_order(symbol, amount, buy_price)
    print(f"Order BUY ID: {buy_order['id']}")

    print(f"Pasang order LIMIT SELL {amount} {symbol} di harga {sell_price} USDT...")
    sell_order = exchange.create_limit_sell_order(symbol, amount, sell_price)
    print(f"Order SELL ID: {sell_order['id']}")

    # Tunggu 10 detik, lalu cek status order
    time.sleep(10)
    print("\nCek status order...")

    buy_status = exchange.fetch_order(buy_order['id'], symbol)
    sell_status = exchange.fetch_order(sell_order['id'], symbol)

    print(f"Status BUY order: {buy_status['status']}")
    print(f"Status SELL order: {sell_status['status']}")

    # Jika order belum terpenuhi, batalkan
    if buy_status['status'] != 'closed':
        print("Batalin order BUY...")
        exchange.cancel_order(buy_order['id'], symbol)

    if sell_status['status'] != 'closed':
        print("Batalin order SELL...")
        exchange.cancel_order(sell_order['id'], symbol)

    print("Selesai!")

if __name__ == '__main__':
    main()
