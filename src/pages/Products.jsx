import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/products/').then((res) => setProducts(res.data.results))
  }, [])

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Products</h2>
      <input
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={styles.grid}>
        {filtered.map((p) => (
          <Link to={`/products/${p.id}`} key={p.id} style={styles.cardLink}>
            <div style={styles.card}>
              {p.image && <img src={`http://localhost:8000${p.image}`} alt={p.name} style={styles.image} />}
              <h3 style={styles.name}>{p.name}</h3>
              <p style={styles.price}>Rs. {p.price}</p>
              <p style={styles.stock}>{p.stock > 0 ? `In stock (${p.stock})` : 'Out of stock'}</p>
              <p style={styles.rating}>⭐ {p.avg_rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '1.8rem', marginBottom: '1rem' },
  search: { width: '100%', padding: '0.6rem', marginBottom: '1.5rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontSize: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' },
  cardLink: { textDecoration: 'none', color: 'inherit' },
  card: { background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'transform 0.2s', cursor: 'pointer' },
  image: { width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' },
  name: { fontSize: '1rem', fontWeight: '600', marginBottom: '0.3rem' },
  price: { color: '#2563eb', fontWeight: '700', marginBottom: '0.3rem' },
  stock: { fontSize: '0.85rem', color: '#666', marginBottom: '0.3rem' },
  rating: { fontSize: '0.85rem' },
}