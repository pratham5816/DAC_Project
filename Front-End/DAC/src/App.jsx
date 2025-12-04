import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StudentLogin from './pages/StudentLogin'
import TeacherLogin from './pages/TeacherLogin'
import AdminLogin from './pages/AdminLogin'
import Appbar from './components/Appbar'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/teacher" element={<TeacherLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </div>
  )
}

export default App
