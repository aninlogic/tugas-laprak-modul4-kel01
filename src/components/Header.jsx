const NAV = ['Catalog', 'About', 'Contact', 'Cart']

function Header({ tab, onTab, cartCount }) {

  return (
    <header className="header">
      <span className="brand display">Gunshop Kelompok 01</span>
      <nav className="nav">
        {NAV.map((item) => (
  <button
    key={item}
    type="button"
    className={
      tab === item
        ? 'nav-link active'
        : 'nav-link'
    }
    onClick={() => onTab(item)}
  >
    {item}

    {item === 'Cart' && cartCount > 0 && (
      <span className="cart-badge">
        {cartCount}
      </span>
    )}
  </button>
))}
      </nav>
    </header>
  )
}

export default Header
