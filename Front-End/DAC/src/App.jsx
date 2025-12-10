import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StudentLogin from './pages/StudentLogin'
import TeacherLogin from './pages/TeacherLogin'
import AdminLogin from './pages/AdminLogin'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import NoticesPage from './pages/NoticesPage'
import Appbar from './components/Appbar'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/teacher" element={<TeacherLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/notices" element={<NoticesPage />} />
      </Routes>
    </div>
  )
}

export default App
