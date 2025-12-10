import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
  Grid
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import { getAllNotices, createNotice, deleteNotice } from '../services/teacherService'

export default function NoticeManagementModal({ open, onClose, teacherData }) {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    paragraph: '',
    instituteCoordinator: teacherData?.firstName + ' ' + teacherData?.lastName || 'Coordinator',
    courseCoordinator: teacherData?.streamOrSubject || 'Course'
  })

  // Fetch notices when modal opens
  useEffect(() => {
    if (open) {
      fetchNotices()
    }
  }, [open])

  const fetchNotices = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getAllNotices()
      setNotices(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Failed to load notices')
      console.error(err)
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
      setError('')
      
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
        instituteCoordinator: teacherData?.firstName + ' ' + teacherData?.lastName || 'Coordinator',
        courseCoordinator: teacherData?.streamOrSubject || 'Course'
      })
      setShowAddForm(false)
      
      // Refresh notices
      await fetchNotices()
    } catch (err) {
      setError(err.message || 'Failed to create notice')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteNotice = async (noticeId) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        setLoading(true)
        setError('')
        
        await deleteNotice(noticeId)
        
        // Remove from UI
        setNotices(notices.filter(n => n.id !== noticeId))
      } catch (err) {
        setError(err.message || 'Failed to delete notice')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          📢 Manage Notices
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 3 }}>
        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Add Notice Button */}
        {!showAddForm && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowAddForm(true)}
            fullWidth
            sx={{ mb: 3, backgroundColor: '#2196F3' }}
          >
            Add New Notice
          </Button>
        )}

        {/* Add Notice Form */}
        {showAddForm && (
          <Card sx={{ mb: 3, backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Create New Notice
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Notice Content"
                    name="paragraph"
                    value={formData.paragraph}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your notice here..."
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Institute Coordinator"
                    name="instituteCoordinator"
                    value={formData.instituteCoordinator}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Course Coordinator"
                    name="courseCoordinator"
                    value={formData.courseCoordinator}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      onClick={handleAddNotice}
                      disabled={loading}
                      sx={{ backgroundColor: '#4CAF50' }}
                    >
                      {loading ? <CircularProgress size={20} /> : 'Post Notice'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Notices List */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
          All Notices ({notices.length})
        </Typography>

        {loading && !showAddForm ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        ) : notices.length === 0 ? (
          <Typography color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
            No notices yet. Create one to get started!
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 400, overflowY: 'auto' }}>
            {notices.map((notice, index) => (
              <Card key={notice.id || index} sx={{ borderLeft: '4px solid #2196F3' }}>
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {notice.paragraph?.substring(0, 80)}...
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                        <Chip
                          label={`Institute: ${notice.instituteCoordinator || 'N/A'}`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={`Course: ${notice.courseCoordinator || 'N/A'}`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="caption" color="textSecondary">
                        📅 {new Date(notice.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteNotice(notice.id)}
                      disabled={loading}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button onClick={fetchNotices} variant="contained" sx={{ backgroundColor: '#2196F3' }}>
          Refresh
        </Button>
      </DialogActions>
    </Dialog>
  )
}
