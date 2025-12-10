import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { studentLogin } from '../services/studentService'
import {
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Link as MuiLink,
  CircularProgress
} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import '../styles/LoginPage.css'

export default function StudentLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }
    try {
      // ✅ Call API to authenticate student (using axios from service layer)
      const response = await studentLogin(email, password)
      console.log('✅ Login response:', response)
      console.log('Email:', email)
      console.log('Password:', password)

      // ✅ Backend now returns Student object with id, firstName, etc.
      if(response && response.id){
           console.log('✅ Student login successful:', response.firstName)
      
        // ✅ Show success message and redirect
        alert(`Welcome ${response.firstName || 'Student'}!`)
        
        // ✅ Store FULL student data and token in localStorage
        localStorage.setItem('student', JSON.stringify(response))
        localStorage.setItem('token', response.token || 'student-token-' + response.id)
        
        // Navigate after storing
        navigate('/student/dashboard')
      } else{

        setError('❌ Student not registered or Invalid Credentials')
        console.error('Login failed - invalid response')
        document.body.style.backgroundColor = '#ffebee'
        setTimeout(() => {
          document.body.style.backgroundColor = ''
        }, 2000)
      }

     
    } catch (err) {
      setError(err.message || 'Login failed. Please check your email and password.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
        <Card className="login-card" sx={{ width: '100%', boxShadow: 3 }}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
              color: 'white',
              py: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}
          >
            <SchoolIcon sx={{ fontSize: 48 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Student Login
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={onSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                required
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#45a049' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
                type="submit"
                disabled={loading}
              >
                {loading && <CircularProgress size={20} color="inherit" />}
                {loading ? 'Logging in...' : 'Login as Student'}
              </Button>
            </form>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                <MuiLink
                  href="/"
                  sx={{ textDecoration: 'none', color: '#4CAF50', fontWeight: 'bold' }}
                >
                  Back to Home
                </MuiLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

