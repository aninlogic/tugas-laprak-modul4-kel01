import { useState } from 'react'

function Cart({
  cart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCheckout,
  onContinueShopping,
}) {
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const [checkedOutItems, setCheckedOutItems] = useState([])

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const checkedOutTotal = checkedOutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const checkedOutCount = checkedOutItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const handleCheckoutClick = () => {
    setCheckedOutItems([...cart])
    onCheckout()
    setCheckoutComplete(true)
    window.scrollTo(0, 0)
  }

  if (checkoutComplete) {
    return (
      <section className="page checkout-page checkout-success">
        <div className="success-card">
          <div className="success-mark" aria-hidden="true">✓</div>
          <p className="success-eyebrow">KONFIRMASI PEMBELIAN</p>
          <h1 className="display">Checkout Berhasil</h1>
          <p className="success-copy">
            Terima kasih telah berbelanja di Gunshop Kelompok 01. Pesanan Anda berhasil dikonfirmasi.
          </p>

          <div className="success-order">
            <h2>Ringkasan Pesanan</h2>
            <ul className="checkout-list success-list">
              {checkedOutItems.map((item) => (
                <li className="checkout-item" key={item.name}>
                  <div className="checkout-info">
                    <img className="checkout-thumb" src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.quantity} × ${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <strong className="checkout-subtotal">
                    ${(item.price * item.quantity).toLocaleString()}
                  </strong>
                </li>
              ))}
            </ul>

            <div className="checkout-summary success-summary">
              <div>
                <span>Total pesanan</span>
                <small>{checkedOutCount} item</small>
              </div>
              <strong>${checkedOutTotal.toLocaleString()}</strong>
            </div>
          </div>

          <button
            className="checkout-btn primary success-return"
            type="button"
            onClick={onContinueShopping}
          >
            Kembali ke Katalog
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="page checkout-page cart-page">
      <div className="cart-heading">
        <div>
          <p className="cart-eyebrow">GUNSHOP KELOMPOK 01</p>
          <h1 className="display">Keranjang Belanja</h1>
          <p className="lede">Periksa pesanan Anda sebelum melanjutkan ke checkout.</p>
        </div>
        {totalItems > 0 && (
          <span className="cart-item-count">
            {totalItems} barang
          </span>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="checkout-empty">
          <div className="empty-cart-mark" aria-hidden="true">0</div>
          <p>Keranjang masih kosong</p>
          <span>Tambahkan produk dari katalog untuk mulai berbelanja.</span>
          <button
            className="checkout-btn primary"
            type="button"
            onClick={onContinueShopping}
          >
            Jelajahi Katalog
          </button>
        </div>
      ) : (
        <>
          <ul className="checkout-list">
            {cart.map((item) => (
              <li className="checkout-item" key={item.name}>
                <div className="checkout-info">
                  <img className="checkout-thumb" src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.type} · {item.caliber}</p>
                    <strong className="cart-unit-price">
                      ${item.price.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="checkout-controls">
                  <div className="quantity-stepper">
                    <button
                      className="qty-button"
                      type="button"
                      aria-label={`Kurangi jumlah ${item.name}`}
                      onClick={() => onDecreaseQuantity(item.name)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="qty-button"
                      type="button"
                      aria-label={`Tambah jumlah ${item.name}`}
                      onClick={() => onIncreaseQuantity(item.name)}
                    >
                      +
                    </button>
                  </div>

                  <div className="checkout-subtotal">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout-summary">
            <div>
              <span>Total belanja</span>
              <small>{totalItems} item dalam keranjang</small>
            </div>
            <strong>${totalPrice.toLocaleString()}</strong>
          </div>

          <div className="checkout-actions">
            <button
              type="button"
              className="checkout-btn secondary"
              onClick={onContinueShopping}
            >
              Lanjut Belanja
            </button>
            <button
              type="button"
              className="checkout-btn primary"
              disabled={cart.length === 0}
              onClick={handleCheckoutClick}
            >
              Checkout Sekarang
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart