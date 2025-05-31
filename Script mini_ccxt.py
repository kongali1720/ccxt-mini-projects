import ccxt

def main():
    # Inisialisasi exchange (ganti sesuai kebutuhan)
    exchange = ccxt.binance({
        # Jika mau cek saldo dan trading, isi API key & secret di sini
        # 'apiKey': 'ISI_API_KEY_KAMU',
        # 'secret': 'ISI_API_SECRET_KAMU',
    })

    # Fetch ticker harga BTC/USDT
    ticker = exchange.fetch_ticker('BTC/USDT')
    print(f"Harga terakhir BTC/USDT: {ticker['last']} USDT")

    # Fetch order book (5 level teratas)
    orderbook = exchange.fetch_order_book('BTC/USDT')
    print("\nOrder Book (5 level teratas):")
    print("Bids (Buy orders):")
    for price, amount in orderbook['bids'][:5]:
        print(f"  Price: {price} USDT, Amount: {amount} BTC")
    print("Asks (Sell orders):")
    for price, amount in orderbook['asks'][:5]:
        print(f"  Price: {price} USDT, Amount: {amount} BTC")

    # Jika ingin cek saldo akun (harus pakai API key & secret)
    try:
        balance = exchange.fetch_balance()
        print("\nSaldo akun:")
        for coin, info in balance['total'].items():
            if info and info > 0:
                print(f"  {coin}: {info}")
    except ccxt.AuthenticationError:
        print("\n⚠️ Tidak ada API key atau autentikasi gagal, saldo akun tidak bisa ditampilkan.")

if __name__ == '__main__':
    main()
