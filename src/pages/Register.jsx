import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [form, setForm] = useState({ email: '', name: '', password: '', password2: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/auth/register/', form)
      navigate('/login')
    } catch (err) {
      setError(JSON.stringify(err.response?.data))
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={submit}>
          <input style={styles.input} name="email" placeholder="Email" onChange={handle} />
          <input style={styles.input} name="name" placeholder="Name" onChange={handle} />
          <input style={styles.input} name="password" type="password" placeholder="Password" onChange={handle} />
          <input style={styles.input} name="password2" type="password" placeholder="Confirm Password" onChange={handle} />
          <button style={styles.button} type="submit">Register</button>
        </form>
        <p style={styles.link}>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' },
  card: { background: '#fff', padding: '2rem', borderRadius: '8px', width: '360px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  title: { marginBottom: '1rem', fontSize: '1.5rem' },
  input: { display: 'block', width: '100%', padding: '0.6rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.7rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
  error: { color: 'red', marginBottom: '1rem' },
  link: { marginTop: '1rem', textAlign: 'center' },
}