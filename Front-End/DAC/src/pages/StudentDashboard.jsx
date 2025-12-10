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
  LinearProgress,
  Chip,
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
  Skeleton
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Book as BookIcon,
  EventNote as EventNoteIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
  Grade as GradeIcon,
  TrendingUp as TrendingUpIcon,
  Error as ErrorIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {
  getStudentProfile,
  getStudentGrades,
  // getStudentAttendance,          // ❌ COMMENTED - Add this later
  // getStudentAssignments,         // ❌ COMMENTED - Add this later
  // getStudentEvents,              // ❌ COMMENTED - Add this later
  getRecentNotices,          
  // getStudentCourses,             // ❌ COMMENTED - Add this later
  getStoredStudentData,
  studentLogout
} from '../services/studentService'
import '../styles/StudentDashboard.css'

const DRAWER_WIDTH = 240

export default function StudentDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Dashboard data states - ONLY 2 APIs for now
  const [studentData, setStudentData] = useState(null)
  const [gradesData, setGradesData] = useState([])
  const [noticesData, setNoticesData] = useState([])
  
  // ❌ COMMENTED OUT - Add these later:
  // const [attendanceData, setAttendanceData] = useState(0)
  // const [assignmentsData, setAssignmentsData] = useState({ completed: 0, total: 0 })
  // const [upcomingEvents, setUpcomingEvents] = useState([])
  // const [coursesData, setCoursesData] = useState([])

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get stored student data
        const storedStudent = getStoredStudentData()

        if (!storedStudent || !storedStudent.id) {
          throw new Error('Student not found. Please login again.')
        }

        const studentId = storedStudent.id

        // 🎯 Fetch ONLY 2 APIs for now - Profile & Grades
        const [
          profileRes,
          gradesRes ,
          // attendanceRes,     // ❌ COMMENTED - Add later
          // assignmentsRes,    // ❌ COMMENTED - Add later
          // eventsRes,         // ❌ COMMENTED - Add later
          // coursesRes,        // ❌ COMMENTED - Add later
          noticesRes 
        ] = await Promise.allSettled([
          getStudentProfile(studentId),
          getStudentGrades(studentId),
          // getStudentAttendance(studentId),
          // getStudentAssignments(studentId),
          // getStudentEvents(studentId),
          // getStudentCourses(studentId),
          getRecentNotices(5),
        ])

        // Handle profile (required)
        if (profileRes.status === 'fulfilled') {
          setStudentData(profileRes.value)
        } else {
          // Fallback to stored data if profile fetch fails
          setStudentData(storedStudent)
        }

        // Handle grades
        if (gradesRes.status === 'fulfilled') {
          setGradesData(Array.isArray(gradesRes.value) ? gradesRes.value : [])
        }

        // Handle notices - Map database structure to UI
        if (noticesRes.status === 'fulfilled' && noticesRes.value) {
          console.log('📢 Notice response received:', {
            status: noticesRes.status,
            valueType: typeof noticesRes.value,
            isArray: Array.isArray(noticesRes.value),
            length: noticesRes.value?.length,
            firstItem: noticesRes.value?.[0]
          })
          const mappedNotices = Array.isArray(noticesRes.value) 
            ? noticesRes.value
                .filter(notice => notice.paragraph && notice.paragraph.trim()) // Filter out null/empty
                .map((notice, index) => ({
                  id: notice.id,
                  title: `📢 ${notice.paragraph.substring(0, 50)}...`,
                  content: notice.paragraph,
                  date: notice.date,
                  priority: index === 0 ? 'high' : 'medium',
                  instituteCoordinator: notice.instituteCoordinator || 'N/A',
                  courseCoordinator: notice.courseCoordinator || 'N/A'
                }))
            : []
          console.log('✅ Mapped notices:', mappedNotices)
          setNoticesData(mappedNotices)
        } else {
          // Fallback to empty if no notices
          console.error('❌ Failed to fetch notices:', {
            status: noticesRes.status,
            reason: noticesRes.reason
          })
          setNoticesData([])
        }
        // if (attendanceRes.status === 'fulfilled') {
        //   setAttendanceData(attendanceRes.value?.percentage || 0)
        // }
        // if (assignmentsRes.status === 'fulfilled') {
        //   const data = assignmentsRes.value
        //   setAssignmentsData({
        //     completed: data?.completed || 0,
        //     total: data?.total || 0
        //   })
        // }
        // if (eventsRes.status === 'fulfilled') {
        //   setUpcomingEvents(Array.isArray(eventsRes.value) ? eventsRes.value : [])
        // }
        // if (coursesRes.status === 'fulfilled') {
        //   setCoursesData(Array.isArray(coursesRes.value) ? coursesRes.value : [])
        // }
        // if (noticesRes.status === 'fulfilled') {
        //   setNoticesData(Array.isArray(noticesRes.value) ? noticesRes.value : [])
        // }
      } catch (err) {
        console.error('Dashboard error:', err)
        setError(err.message || 'Failed to load dashboard data')
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
    await studentLogout()
    navigate('/')
  }

  // Refresh dashboard data
  const handleRefresh = async () => {
    setLoading(true)
    setError(null)
    
    const storedStudent = getStoredStudentData()
    if (storedStudent?.id) {
      try {
        const profile = await getStudentProfile(storedStudent.id)
        setStudentData(profile)
      } catch (err) {
        setError('Failed to refresh data')
      }
    }
    
    setLoading(false)
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, active: true },
    { text: 'Courses', icon: <BookIcon />, active: false },
    { text: 'Assignments', icon: <AssignmentIcon />, active: false },
    { text: 'Grades', icon: <GradeIcon />, active: false },
    { text: 'Attendance', icon: <EventNoteIcon />, active: false },
    { text: 'Messages', icon: <PeopleIcon />, active: false }
  ]

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Avatar sx={{ bgcolor: '#667eea', width: 32, height: 32 }}>S</Avatar>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Student Hub
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
              backgroundColor: item.active ? '#667eea20' : 'transparent',
              '&:hover': { backgroundColor: '#667eea15' }
            }}
          >
            <ListItemIcon sx={{ color: item.active ? '#667eea' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <List>
        <ListItem button sx={{ borderRadius: '8px', mb: 1 }}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button sx={{ borderRadius: '8px' }} onClick={handleLogout}>
          <ListItemIcon sx={{ color: '#ff6b6b' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: '#ff6b6b' }} />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <Button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Student Dashboard
          </Typography>
          {studentData && (
            <Avatar 
              src={studentData.profilePicture || `https://i.pravatar.cc/150?img=${studentData.id}`}
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
              <Typography sx={{ mt: 2, color: '#667eea' }}>
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
          {!loading && studentData && (
            <>
              {/* Header Section */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar
                    src={studentData.profilePicture || `https://i.pravatar.cc/150?img=${studentData.id}`}
                    sx={{ width: 80, height: 80, boxShadow: 3 }}
                  />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Welcome back, {studentData.firstName} {studentData.lastName}!
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<BookIcon />}
                        label={`${studentData.course}`}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={`Roll: ${studentData.userName}`}
                        variant="outlined"
                      />
                      <Chip
                        label={`Email: ${studentData.mail}`}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Stats Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* CARD 1: Profile/GPA - FROM DATABASE */}
                <Grid item xs={12} sm={6} md={6}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      boxShadow: '0 8px 16px rgba(102, 126, 234, 0.4)',
                      borderRadius: 3,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)' }
                    }}
                  >
                    <CardContent>
                      <Typography color="inherit" variant="body2" sx={{ opacity: 0.9 }}>
                        Current GPA
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>
                        {studentData.gpa || 'N/A'}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Out of 4.0
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* ❌ COMMENTED OUT CARDS - Add these later:
                
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', ... }}>
                    Attendance card
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', ... }}>
                    Active Courses card
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', ... }}>
                    Assignments card
                  </Card>
                </Grid>
                
                */}
              </Grid>

              {/* Main Content Grid */}
              <Grid container spacing={3}>
                {/* Recent Grades */}
                <Grid item xs={12}>
                  <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        📊 Recent Grades (FROM DATABASE)
                      </Typography>
                      <Divider sx={{ mb: 2 }} />

                      {gradesData && gradesData.length > 0 ? (
                        gradesData.map((grade, index) => (
                          <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1
                              }}
                            >
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {grade.subject || grade.courseName || 'Unknown'}
                              </Typography>
                              <Chip
                                label={grade.grade || 'N/A'}
                                color="success"
                                size="small"
                                sx={{ fontWeight: 'bold' }}
                              />
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={Math.min(grade.score || 0, 100)}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 4,
                                  background: 'linear-gradient(90deg, #667eea, #764ba2)'
                                }
                              }}
                            />
                            <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                              Score: {grade.score || 0}/100
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography color="textSecondary">No grades available yet</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                {/* 📢 NOTICES CARD - New Addition */}
                <Grid item xs={12}>
                  <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: '#fff9e6' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          📢 Recent Notices
                        </Typography>
                        <Chip 
                          label={`${noticesData.length || 0} new`}
                          size="small"
                          color="error"
                          variant="outlined"
                        />
                      </Box>
                      <Divider sx={{ mb: 2 }} />

                      {noticesData && noticesData.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {noticesData.map((notice, index) => (
                            <Box 
                              key={index} 
                              sx={{ 
                                p: 2, 
                                backgroundColor: '#fff',
                                borderLeft: `4px solid ${notice.priority === 'high' ? '#ff6b6b' : '#ffa940'}`,
                                borderRadius: 1,
                                transition: 'all 0.3s',
                                '&:hover': {
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                  transform: 'translateX(4px)'
                                }
                              }}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', flex: 1 }}>
                                  {notice.title}
                                </Typography>
                                <Chip 
                                  label={notice.priority}
                                  size="small"
                                  color={notice.priority === 'high' ? 'error' : 'warning'}
                                  variant="outlined"
                                />
                              </Box>
                              <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                                {notice.content}
                              </Typography>
                              
                              {/* Coordinator Information */}
                              <Box sx={{ mb: 2, p: 1.5, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
                                  👨‍💼 <strong>Institute Coordinator:</strong> {notice.instituteCoordinator}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
                                  👩‍🏫 <strong>Course Coordinator:</strong> {notice.courseCoordinator}
                                </Typography>
                              </Box>
                              
                              <Typography variant="caption" sx={{ color: '#999' }}>
                                📅 {new Date(notice.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Typography color="textSecondary">No notices at the moment</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                {/* ❌ COMMENTED OUT SECTIONS - Add these later:
                
                <Grid item xs={12} md={5}>
                  <Card>
                    <CardContent>
                      Upcoming Events section
                    </CardContent>
                  </Card>
                </Grid>
                
                */}
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </Box>
  )
}
