import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  Grid
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { getAllNotices, deleteNotice, createNotice } from '../services/teacherService'

export default function NoticesPage() {
  const navigate = useNavigate()
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    paragraph: '',
    instituteCoordinator: 'Coordinator',
    courseCoordinator: 'Course'
  })

  // Load notices when page opens
  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getAllNotices()
      setNotices(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Failed to load notices')
    } finally {
      setLoading(false)
    }
  }

  const handleAddNotice = async () => {
    if (!formData.paragraph.trim()) {
      setError('Please enter notice content')
      return
    }

    try {
      setLoading(true)
      const newNotice = {
        paragraph: formData.paragraph,
        instituteCoordinator: formData.instituteCoordinator,
        courseCoordinator: formData.courseCoordinator,
        date: new Date().toISOString().split('T')[0]
      }

      await createNotice(newNotice)
      
      // Reset form
      setFormData({
        paragraph: '',
        instituteCoordinator: 'Coordinator',
        courseCoordinator: 'Course'
      })
      setShowAddForm(false)
      setError('')
      
      // Refresh list
      await fetchNotices()
    } catch (err) {
      setError(err.message || 'Failed to create notice')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteNotice = async (id) => {
    if (window.confirm('Delete this notice?')) {
      try {
        await deleteNotice(id)
        setNotices(notices.filter(n => n.id !== id))
      } catch (err) {
        setError('Failed to delete notice')
      }
    }
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar sx={{ backgroundColor: '#2196F3' }}>
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/teacher/dashboard')}
          >
            Back
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            📢 All Notices
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 3, pb: 3 }}>
        {/* Error Alert */}
        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Add Notice Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            onClick={() => setShowAddForm(!showAddForm)}
            sx={{ backgroundColor: '#4CAF50', height: 50 }}
          >
            {showAddForm ? 'Cancel' : 'Add New Notice'}
          </Button>
        </Box>

        {/* Add Notice Form */}
        {showAddForm && (
          <Card sx={{ mb: 3, p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Create Notice
            </Typography>
            <input
              type="text"
              placeholder="Notice Content"
              value={formData.paragraph}
              onChange={(e) => setFormData({ ...formData, paragraph: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
            <textarea
              placeholder="Enter your notice here..."
              value={formData.paragraph}
              onChange={(e) => setFormData({ ...formData, paragraph: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                minHeight: '100px',
                fontSize: '14px',
                fontFamily: 'Arial'
              }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleAddNotice}
                disabled={loading}
                sx={{ backgroundColor: '#4CAF50' }}
              >
                {loading ? 'Adding...' : 'Post Notice'}
              </Button>
              <Button variant="outlined" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </Box>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Notices List */}
        {!loading && (
          <>
            <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
              Total: {notices.length} notices
            </Typography>

            {notices.length === 0 ? (
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="textSecondary">
                  No notices yet. Create one!
                </Typography>
              </Card>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {notices.map((notice) => (
                  <Card key={notice.id} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {notice.paragraph?.substring(0, 100)}
                          {notice.paragraph?.length > 100 ? '...' : ''}
                        </Typography>

                        <Box sx={{ mb: 1 }}>
                          <Chip label={`Institute: ${notice.instituteCoordinator || 'N/A'}`} size="small" sx={{ mr: 1 }} />
                          <Chip label={`Course: ${notice.courseCoordinator || 'N/A'}`} size="small" />
                        </Box>

                        <Typography variant="caption" sx={{ color: '#999' }}>
                          {new Date(notice.date).toLocaleDateString()}
                        </Typography>
                      </Box>

                      <Button
                        color="error"
                        size="small"
                        onClick={() => handleDeleteNotice(notice.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}
