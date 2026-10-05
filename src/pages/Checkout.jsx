function Checkout({ cart, onAdd, onRemove, onClear, onConfirm }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <section className="page checkout-page">
      <h1>Checkout</h1>
      <p className="lede">Review the gear you want to take home and confirm the final total.</p>

      {cart.length === 0 ? (
        <div className="checkout-empty">
          <p>Your cart is empty.</p>
          <span>Add a few pieces from the catalog to start your order.</span>
        </div>
      ) : (
        <>
          <ul className="checkout-list">
            {cart.map((item) => (
              <li key={item.name} className="checkout-item">
                <div className="checkout-info">
                  <img src={item.image} alt={item.name} className="checkout-thumb" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      {item.type} · {item.caliber}
                    </p>
                    <strong>${item.price.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="checkout-controls">
                  <div className="quantity-stepper" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" className="qty-button" onClick={() => onRemove(item.name)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" className="qty-button" onClick={() => onAdd(item)}>
                      +
                    </button>
                  </div>
                  <span className="checkout-subtotal">${(item.quantity * item.price).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout-summary">
            <div>
              <span>{totalItems} item{totalItems > 1 ? 's' : ''}</span>
            </div>
            <strong>Total: ${totalPrice.toLocaleString()}</strong>
          </div>

          <div className="checkout-actions">
            <button type="button" className="checkout-btn secondary" onClick={onClear}>
              Clear cart
            </button>
            <button type="button" className="checkout-btn primary" onClick={onConfirm}>
              Confirm purchase
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default Checkout
