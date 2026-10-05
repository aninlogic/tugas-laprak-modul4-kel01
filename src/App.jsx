import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import GUNS from './data/guns.js'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [guns, setGuns] = useState(GUNS)
  const [cart, setCart] = useState([])

const handleAddToCart = (gun) => {
  if (cart.some((item) => item.name === gun.name)) {
    return
  }

  setCart((prev) => [
    ...prev,
    { ...gun, quantity: 1 }
  ])
}

const handleIncreaseQuantity = (gunName) => {
  setCart((prev) =>
    prev.map((item) =>
      item.name === gunName
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  )
}

const handleDecreaseQuantity = (gunName) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.name === gunName
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  )
}

const handleCheckout = () => {
  if (cart.length === 0) return

  const purchasedNames = cart.map((item) => item.name)

  setGuns((prevGuns) =>
    prevGuns.filter(
      (gun) => !purchasedNames.includes(gun.name)
    )
  )

  setCart([])
}

  const removeFromCart = (gunName) => {
    setCart((current) =>
      current.flatMap((item) => {
        if (item.name !== gunName) {
          return [item]
        }

        const nextQuantity = item.quantity - 1
        return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : []
      }),
    )
  }

  const confirmPurchase = () => {
    if (cart.length === 0) {
      return
    }

    setCart([])
    setTab('Catalog')
    window.alert('Purchase confirmed! Your order is being prepared.')
  }

  const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
)

  return (
    <div className="shell">
    <Header
  tab={tab}
  onTab={setTab}
  cartCount={cartCount}
/>

<main className="main">
  {tab === 'Catalog' && (
    <Catalog
      guns={guns}
      cart={cart}
      onAddToCart={handleAddToCart}
    />
  )}

  {tab === 'About' && <About />}

  {tab === 'Contact' && <Contact />}

  {tab === 'Cart' && (
    <Cart
      cart={cart}
      onIncreaseQuantity={handleIncreaseQuantity}
      onDecreaseQuantity={handleDecreaseQuantity}
      onCheckout={handleCheckout}
      onContinueShopping={() => setTab('Catalog')}
    />
  )}
</main>

      <Footer />
    </div>
  )
}

export default App