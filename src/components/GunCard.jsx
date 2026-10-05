import { useRef } from 'react'

function GunCard({ gun, cart, onAddToCart }) {
  const popup = useRef(null)

  const handleAdd = () => {
    onAddToCart?.(gun)
    popup.current?.close()
  }

  const isInCart = cart.some(
  (item) => item.name === gun.name
)

  return (
   <li className="card">

  <button
    className="card-btn"
    onClick={() => popup.current.showModal()}
  >
    <img
      className="card-img"
      src={gun.image}
      alt=""
      width="120"
      height="90"
    />

    <span className="name display">
      {gun.name}
    </span>

    <span className="type">
      {gun.type} · {gun.caliber}
    </span>

    <span className="price">
      ${gun.price.toLocaleString()}
    </span>
  </button>

  <div className="card-actions">
    <button
      type="button"
      className={`btn-cart ${isInCart ? 'in-cart' : ''}`}
      disabled={isInCart}
      onClick={() => onAddToCart(gun)}
    >
      {isInCart
        ? '✓ Di Keranjang'
        : '+ Keranjang'}
    </button>
  </div>

  <dialog
    className="popup"
    ref={popup}
    onClick={(e) =>
      e.target === popup.current &&
      popup.current.close()
    }
  >
    {/* isi dialog tetap seperti sebelumnya */}
  </dialog>

</li>
  )
}

export default GunCard
