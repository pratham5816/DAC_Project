import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import StudentLogin from './pages/StudentLogin'
import TeacherLogin from './pages/TeacherLogin'
import AdminLogin from './pages/AdminLogin'

function App() {
  return(
    <div className="container">
      <header className="app-header">
        <div className="brand">
          <h1>Infoway Student Application</h1>
          <div className="brand-sub">Portal for students, teachers & admins</div>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/student">Student Login</Link>
          <Link to="/teacher">Teacher Login</Link>
          <Link to="/admin">Admin Login</Link>
        </nav>
      </header>

      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<StudentLogin />} />
          <Route path="/teacher" element={<TeacherLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </main>
    </div>
  )
}

function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Choose a login type from the navigation above.</p>
    </div>
  )
}

export default App;
