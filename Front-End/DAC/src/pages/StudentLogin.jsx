import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import axios from "axios";
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
      // Replace with actual API call

      
      console.log('Student login attempt:', { email, password })
      // Simulated delay
      setTimeout(() => {
        alert('Student login successful!')
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError('Login failed. Please try again.')
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
                  fontWeight: 'bold'
                }}
                type="submit"
                disabled={loading}
              >
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

