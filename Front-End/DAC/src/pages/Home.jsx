import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardMedia, Button, Container, Typography, Box, Grid } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import PeopleIcon from '@mui/icons-material/People'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate()

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access your student portal',
      icon: SchoolIcon,
      color: '#4CAF50',
      path: '/student'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Manage classes and assignments',
      icon: PeopleIcon,
      color: '#2196F3',
      path: '/teacher'
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage system and users',
      icon: AdminPanelSettingsIcon,
      color: '#FF9800',
      path: '/admin'
    }
  ]

  return (
    <div className="home-container">
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Welcome to Infoway Portal
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Select your role to login
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {roles.map((role) => {
            const IconComponent = role.icon
            return (
              <Grid item xs={12} sm={6} md={4} key={role.id}>
                <Card
                  className="role-card"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
                    },
                    borderTop: `4px solid ${role.color}`
                  }}
                >
                  <CardContent
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: '50%',
                        backgroundColor: `${role.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 64,
                          color: role.color
                        }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {role.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                      {role.description}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 'auto',
                        backgroundColor: role.color,
                        '&:hover': {
                          backgroundColor: role.color,
                          opacity: 0.9
                        }
                      }}
                      onClick={() => navigate(role.path)}
                    >
                      Login
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}
