import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Link as MuiLink
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import { teacherLogin } from '../services/teacherService'
import '../styles/LoginPage.css'

export default function TeacherLogin() {
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
      const response = await teacherLogin(email, password)
      
      // Check if response contains teacher ID
      if (response && response.id) {
        // Store teacher data in localStorage
        localStorage.setItem('teacher', JSON.stringify(response))
        localStorage.setItem('teacherToken', 'teacher_token_' + response.id)
        
        alert(`Welcome back, ${response.firstName}!`)
        navigate('/teacher/dashboard')
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
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
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
              color: 'white',
              py: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}
          >
            <PeopleIcon sx={{ fontSize: 48 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Teacher Login
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
                  backgroundColor: '#2196F3',
                  '&:hover': { backgroundColor: '#1976D2' },
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login as Teacher'}
              </Button>
            </form>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                <MuiLink
                  href="/"
                  sx={{ textDecoration: 'none', color: '#2196F3', fontWeight: 'bold' }}
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
