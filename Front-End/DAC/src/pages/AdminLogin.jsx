import { useState } from 'react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Admin login', { username, password })
    alert('Admin login submitted (check console)')
  }

  return (
    <div className="auth-card">
      <h2 className="auth-title">Admin Login</h2>
      <form onSubmit={onSubmit} className="auth-form">
        <div className="form-row">
          <label className="form-label">Username</label>
          <input className="form-input" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="auth-actions">
          <button className="btn primary" type="submit">Login as Admin</button>
        </div>
      </form>
    </div>
  )
}
