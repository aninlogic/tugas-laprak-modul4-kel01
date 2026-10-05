import { useMemo, useRef, useState } from 'react'
import GunCard from '../components/GunCard.jsx'

const FILTERS = ['All', 'Pistol', 'Pistol Air', 'Rifle', 'Shotgun']

function Catalog({ guns, cart, onAddToCart }) {
  const [selectedType, setSelectedType] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const searchInput = useRef(null)

  const toggleSort = (sortKey) => {
    setSortBy((currentSort) =>
      currentSort.startsWith(sortKey)
        ? `${sortKey}-${currentSort.endsWith('asc') ? 'desc' : 'asc'}`
        : `${sortKey}-asc`,
    )
  }

  const displayedGuns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    // Search + Filter
    let result = guns.filter((gun) => {
      const matchesSearch = !query || gun.name.toLowerCase().includes(query)

      const matchesType =
        selectedType === 'All' || gun.type === selectedType

      return matchesSearch && matchesType
    })

    // Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    } else if (sortBy === 'name-desc') {
      result = [...result].sort((a, b) =>
        b.name.localeCompare(a.name)
      )
    }

    return result
  }, [guns, selectedType, searchQuery, sortBy])

  return (
    <>
      <section className="masthead">
        <h1 className="display">
          Gunshop 01
        </h1>

        <p className="lede">
          Tempat penjualan produk pilihan Kelompok 01.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">
            {displayedGuns.length} pieces
          </span>
        </div>

        {/* Search */}
        <div className="search-bar">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            ref={searchInput}
            type="text"
            aria-label="Cari nama produk"
            placeholder="Cari nama produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear"
              type="button"
              aria-label="Hapus pencarian"
              onClick={() => {
                setSearchQuery('')
                searchInput.current?.focus()
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter */}
        <div
          className="filter-bar"
          aria-label="Filter weapon type"
        >
          {FILTERS.map((type) => (
            <button
              key={type}
              type="button"
              className={
                selectedType === type
                  ? 'filter-btn active'
                  : 'filter-btn'
              }
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <div className="sort-wrapper">
          <span className="sort-label">Urutkan:</span>
          <div className="sort-buttons" role="group" aria-label="Urutkan produk">
            <button
              type="button"
              className={`sort-btn ${sortBy === 'default' ? 'active' : ''}`}
              aria-pressed={sortBy === 'default'}
              onClick={() => setSortBy('default')}
            >
              Default
            </button>
            <button
              type="button"
              className={`sort-btn ${sortBy.startsWith('name') ? 'active' : ''}`}
              aria-pressed={sortBy.startsWith('name')}
              onClick={() => toggleSort('name')}
            >
              {sortBy === 'name-desc' ? 'Nama: Z-A' : 'Nama: A-Z'}
            </button>
            <button
              type="button"
              className={`sort-btn ${sortBy.startsWith('price') ? 'active' : ''}`}
              aria-pressed={sortBy.startsWith('price')}
              onClick={() => toggleSort('price')}
            >
              {sortBy === 'price-desc' ? 'Harga: Tinggi-Rendah' : 'Harga: Rendah-Tinggi'}
            </button>
          </div>
        </div>

        {/* Product List */}
        <ul className="stock">
          {displayedGuns.length === 0 ? (
            <li className="empty-results">Produk tidak ditemukan.</li>
          ) : displayedGuns.map((gun) => (
            <GunCard
              key={gun.name}
              gun={gun}
              cart={cart}
              onAddToCart={onAddToCart}
            />
          ))}
        </ul>
      </section>
    </>
  )
}

export default Catalog