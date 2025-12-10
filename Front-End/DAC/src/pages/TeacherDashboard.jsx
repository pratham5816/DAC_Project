import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
  Error as ErrorIcon,
  Book as BookIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {
  getTeacherProfile,
  getTeacherClasses,
  getTeacherStudents,
  getStoredTeacherData,
  teacherLogout
} from '../services/teacherService'
import '../styles/StudentDashboard.css'

const DRAWER_WIDTH = 240

export default function TeacherDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Dashboard data states
  const [teacherData, setTeacherData] = useState(null)
  const [classesData, setClassesData] = useState([])
  const [studentsData, setStudentsData] = useState([])

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get stored teacher data
        const storedTeacher = getStoredTeacherData()

        if (!storedTeacher || !storedTeacher.id) {
          throw new Error('Teacher not found. Please login again.')
        }

        const teacherId = storedTeacher.id

        // Fetch teacher profile, classes, and students
        const [profileRes, classesRes, studentsRes] = await Promise.allSettled([
          getTeacherProfile(teacherId),
          getTeacherClasses(teacherId),
          getTeacherStudents(teacherId),
        ])

        console.log("student res " + studentsRes.value);
        console.log(typeof(studentsData.value))
        // Handle profile (required)
        if (profileRes.status === 'fulfilled') {
          setTeacherData(profileRes.value)
        } else {
          setTeacherData(storedTeacher)
        }

        // Handle classes
        if (classesRes.status === 'fulfilled') {
          setClassesData(Array.isArray(classesRes.value) ? classesRes.value : [])
        }

        // Handle students
        if (studentsRes.status === 'fulfilled') {
          setStudentsData(Array.isArray(studentsRes.value) ? studentsRes.value : [])
        }

      } catch (err) {
        console.error('Error loading dashboard:', err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = async () => {
    await teacherLogout()
    navigate('/')
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: true },
    { text: 'My Classes', icon: <BookIcon />, active: false },
    { text: 'Students', icon: <PeopleIcon />, active: false },
  ]

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Avatar sx={{ bgcolor: '#2196F3', width: 32, height: 32 }}>T</Avatar>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Teacher Hub
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{
              borderRadius: '8px',
              mb: 1,
              backgroundColor: item.active ? '#2196F320' : 'transparent',
              '&:hover': { backgroundColor: '#2196F315' }
            }}
          >
            <ListItemIcon sx={{ color: item.active ? '#2196F3' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <List>
        <ListItem button sx={{ borderRadius: '8px' }} onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar sx={{ backgroundColor: '#2196F3', position: 'fixed', zIndex: 1201 }}>
        <Toolbar>
          <Button
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {mobileOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Teacher Dashboard
          </Typography>
          {teacherData && (
            <Avatar 
              src={teacherData.profilePicture || `https://i.pravatar.cc/150?img=${teacherData.id}`}
              sx={{ width: 40, height: 40 }} 
            />
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar - Desktop */}
      <Box
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', sm: 'block' },
          borderRight: '1px solid #e0e0e0',
          backgroundColor: '#fff',
          mt: 8,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto'
        }}
      >
        {drawer}
      </Box>

      {/* Sidebar - Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <Box sx={{ width: DRAWER_WIDTH, mt: 8 }}>{drawer}</Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          mt: 8,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
        }}
      >
        <Container maxWidth="lg">
          {/* Loading State */}
          {loading && (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <CircularProgress />
              <Typography sx={{ mt: 2, color: '#2196F3' }}>
                Loading dashboard data...
              </Typography>
            </Box>
          )}

          {/* Error State */}
          {error && !loading && (
            <Alert
              severity="error"
              onClose={() => setError(null)}
              sx={{
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <ErrorIcon />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Error Loading Dashboard
                </Typography>
                <Typography variant="body2">{error}</Typography>
              </Box>
            </Alert>
          )}

          {/* Success State - Dashboard Content */}
          {!loading && teacherData && (
            <>
              {/* Header Section */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar
                    src={teacherData.profilePicture || `https://i.pravatar.cc/150?img=${teacherData.id}`}
                    sx={{ width: 80, height: 80, boxShadow: 3 }}
                  />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Welcome back, {teacherData.firstName} {teacherData.lastName}!
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<BookIcon />}
                        label={`${teacherData.streamOrSubject || 'Subject'}`}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={`Email: ${teacherData.mail}`}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Stats Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* CARD 1: Classes Count */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                      color: 'white',
                      boxShadow: '0 8px 16px rgba(33, 150, 243, 0.4)',
                      borderRadius: 3,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)' }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <BookIcon sx={{ fontSize: 48, mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Classes
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {classesData.length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* CARD 2: Students Count */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
                      color: 'white',
                      boxShadow: '0 8px 16px rgba(76, 175, 80, 0.4)',
                      borderRadius: 3,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)' }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <PeopleIcon sx={{ fontSize: 48, mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Students
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        {studentsData.length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* CARD 3: Profile */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                      color: 'white',
                      boxShadow: '0 8px 16px rgba(255, 152, 0, 0.4)',
                      borderRadius: 3,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)' }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <SchoolIcon sx={{ fontSize: 48, mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {teacherData.userName}
                      </Typography>
                      <Typography variant="body2">
                        {teacherData.streamOrSubject || 'Department'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* CARD 4: Notice Management */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                      color: 'white',
                      boxShadow: '0 8px 16px rgba(156, 39, 176, 0.4)',
                      borderRadius: 3,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)' },
                      cursor: 'pointer',
                      minHeight: 180,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                    onClick={() => navigate('/teacher/notices')}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 3 }}>
                      <NotificationsIcon sx={{ fontSize: 48, mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Notices
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: '#fff', color: '#9C27B0', fontWeight: 'bold', mt: 1 }}
                        onClick={() => navigate('/teacher/notices')}
                      >
                        Manage
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Classes Section */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        📚 My Classes
                      </Typography>
                      <Divider sx={{ mb: 2 }} />

                      {classesData && classesData.length > 0 ? (
                        <Grid container spacing={2}>
                          {classesData.map((cls, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <Card
                                sx={{
                                  p: 2,
                                  backgroundColor: '#f5f5f5',
                                  transition: 'all 0.3s',
                                  '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    transform: 'translateY(-3px)'
                                  }
                                }}
                              >
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                  {cls.name}
                                </Typography>
                                <Chip
                                  label={`${cls.students || 0} students`}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Typography color="textSecondary">No classes assigned yet</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </Box>
  )
}
