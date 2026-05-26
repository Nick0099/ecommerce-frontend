import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem('access')

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/products" style={styles.brand}>🛒 ECommerce</Link>
      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Products</Link>
        {isLoggedIn && <Link to="/cart" style={styles.link}>Cart</Link>}
        {isLoggedIn && <Link to="/orders" style={styles.link}>Orders</Link>}
        {isLoggedIn
          ? <button style={styles.logout} onClick={logout}>Logout</button>
          : <Link to="/login" style={styles.link}>Login</Link>
        }
      </div>
    </nav>
  )
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#1e40af', color: '#fff' },
  brand: { color: '#fff', textDecoration: 'none', fontWeight: '700', fontSize: '1.2rem' },
  links: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  link: { color: '#fff', textDecoration: 'none', fontSize: '0.95rem' },
  logout: { background: 'none', border: '1px solid #fff', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer' },
}