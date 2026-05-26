import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get(`/products/${id}/`).then((res) => setProduct(res.data))
  }, [id])

  const addToCart = async () => {
    try {
      await api.post('/cart/add/', { product_id: product.id, quantity: qty })
      setMessage('Added to cart!')
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to add to cart')
    }
  }

  if (!product) return <p style={{ padding: '2rem' }}>Loading...</p>

  return (
    <div style={styles.container}>
      <button style={styles.back} onClick={() => navigate('/products')}>← Back</button>
      <div style={styles.card}>
        {product.image && <img src={`http://localhost:8000${product.image}`} alt={product.name} style={styles.image} />}
        <div style={styles.info}>
          <h2 style={styles.name}>{product.name}</h2>
          <p style={styles.category}>Category: {product.category_name}</p>
          <p style={styles.seller}>Seller: {product.seller_name}</p>
          <p style={styles.desc}>{product.description}</p>
          <p style={styles.price}>Rs. {product.price}</p>
          <p style={styles.rating}>⭐ {product.avg_rating}</p>
          <p style={styles.stock}>{product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}</p>
          {product.stock > 0 && (
            <div style={styles.cartRow}>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                style={styles.qty}
              />
              <button style={styles.button} onClick={addToCart}>Add to Cart</button>
            </div>
          )}
          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem' },
  back: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', marginBottom: '1rem', color: '#2563eb' },
  card: { display: 'flex', gap: '2rem', background: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  image: { width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px' },
  info: { flex: 1 },
  name: { fontSize: '1.5rem', marginBottom: '0.5rem' },
  category: { color: '#666', marginBottom: '0.3rem' },
  seller: { color: '#666', marginBottom: '0.5rem' },
  desc: { marginBottom: '1rem', lineHeight: '1.6' },
  price: { fontSize: '1.3rem', color: '#2563eb', fontWeight: '700', marginBottom: '0.3rem' },
  rating: { marginBottom: '0.3rem' },
  stock: { color: '#666', marginBottom: '1rem' },
  cartRow: { display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' },
  qty: { width: '70px', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' },
  button: { padding: '0.6rem 1.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
  message: { color: 'green', fontWeight: '600' },
}