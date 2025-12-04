import { useState } from 'react'

export default function TeacherLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Teacher login', { email, password })
    alert('Teacher login submitted (check console)')
  }

  return (
    <div className="auth-card">
      <h2 className="auth-title">Teacher Login</h2>
      <form onSubmit={onSubmit} className="auth-form">
        <div className="form-row">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="auth-actions">
          <button className="btn primary" type="submit">Login as Teacher</button>
        </div>
      </form>
    </div>
  )
}
