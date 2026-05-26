import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/orders/').then((res) => setOrders(res.data.results))
  }, [])

  const cancel = async (id) => {
    try {
      await api.post(`/orders/${id}/cancel/`)
      api.get('/orders/').then((res) => setOrders(res.data.results))
    } catch (err) {
      alert(err.response?.data?.error)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet. <span style={{ color: '#2563eb', cursor: 'pointer' }} onClick={() => navigate('/products')}>Shop now</span></p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={styles.card}>
            <div style={styles.header}>
              <span style={styles.orderId}>Order #{order.id}</span>
              <span style={{ ...styles.status, background: statusColor(order.status) }}>{order.status}</span>
            </div>
            <p style={styles.address}>📍 {order.shipping_address}</p>
            {order.items.map((item) => (
              <div key={item.id} style={styles.item}>
                <span>{item.product_name}</span>
                <span>x{item.quantity}</span>
                <span>Rs. {item.subtotal}</span>
              </div>
            ))}
            <div style={styles.total}>Total: Rs. {order.final_price}</div>
            {['pending', 'confirmed'].includes(order.status) && (
              <button style={styles.cancelBtn} onClick={() => cancel(order.id)}>Cancel Order</button>
            )}
          </div>
        ))
      )}
    </div>
  )
}

function statusColor(status) {
  const map = { pending: '#f59e0b', confirmed: '#3b82f6', shipped: '#8b5cf6', delivered: '#10b981', cancelled: '#ef4444' }
  return map[status] || '#6b7280'
}

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem' },
  title: { fontSize: '1.8rem', marginBottom: '1.5rem' },
  card: { background: '#fff', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  orderId: { fontWeight: '700', fontSize: '1.1rem' },
  status: { padding: '0.2rem 0.8rem', borderRadius: '999px', color: '#fff', fontSize: '0.85rem', fontWeight: '600' },
  address: { color: '#666', marginBottom: '1rem' },
  item: { display: 'flex', gap: '1rem', padding: '0.4rem 0', borderBottom: '1px solid #f0f0f0' },
  total: { fontWeight: '700', marginTop: '0.8rem', fontSize: '1.1rem' },
  cancelBtn: { marginTop: '1rem', padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
}