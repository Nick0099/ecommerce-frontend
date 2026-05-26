import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Cart() {
  const [cart, setCart] = useState(null)
  const [address, setAddress] = useState('')
  const [coupon, setCoupon] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const fetchCart = () => api.get('/cart/').then((res) => setCart(res.data))

  useEffect(() => { fetchCart() }, [])

  const remove = async (id) => {
    await api.delete(`/cart/${id}/`)
    fetchCart()
  }

  const clear = async () => {
    await api.delete('/cart/')
    fetchCart()
  }

  const checkout = async () => {
    try {
      await api.post('/orders/checkout/', { shipping_address: address, coupon_code: coupon })
      setMessage('Order placed successfully!')
      fetchCart()
      setTimeout(() => navigate('/orders'), 1500)
    } catch (err) {
      setMessage(err.response?.data?.error || JSON.stringify(err.response?.data))
    }
  }

  if (!cart) return <p style={{ padding: '2rem' }}>Loading...</p>

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.id} style={styles.item}>
              <span style={styles.itemName}>{item.product_detail.name}</span>
              <span>Qty: {item.quantity}</span>
              <span>Rs. {item.subtotal}</span>
              <button style={styles.removeBtn} onClick={() => remove(item.id)}>Remove</button>
            </div>
          ))}
          <div style={styles.total}>Total: Rs. {cart.total}</div>
          <button style={styles.clearBtn} onClick={clear}>Clear Cart</button>
          <div style={styles.checkout}>
            <input style={styles.input} placeholder="Shipping address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input style={styles.input} placeholder="Coupon code (optional)" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            <button style={styles.button} onClick={checkout}>Place Order</button>
          </div>
          {message && <p style={styles.message}>{message}</p>}
        </>
      )}
    </div>
  )
}

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '1.8rem', marginBottom: '1.5rem' },
  item: { display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: '#fff', borderRadius: '8px', marginBottom: '0.8rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  itemName: { flex: 1, fontWeight: '600' },
  removeBtn: { padding: '0.3rem 0.8rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  total: { fontSize: '1.2rem', fontWeight: '700', margin: '1rem 0' },
  clearBtn: { padding: '0.5rem 1rem', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '1.5rem' },
  checkout: { display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '400px' },
  input: { padding: '0.6rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' },
  button: { padding: '0.7rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
  message: { marginTop: '1rem', fontWeight: '600', color: 'green' },
}