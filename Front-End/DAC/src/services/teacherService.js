import axios from 'axios'

// ═══════════════════════════════════════════════════════════════
// 📚 TEACHER API FUNCTIONS (Service Layer)
// ═══════════════════════════════════════════════════════════════

/**
 * ✅ 1. TEACHER LOGIN - POST /teacher/checkLogin
 * Authenticate teacher with email and password
 */
export const teacherLogin = async (email, password) => {
  try {
    console.log('📡 Teacher login attempt:', { email })
    const response = await axios.post('http://localhost:8080/teacher/checkLogin', {
      email: email,
      password: password
    })
    console.log('✅ Teacher login response:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Teacher login failed:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Invalid email or password')
  }
}

/**
 * ✅ 2. GET TEACHER PROFILE - GET /teacher/{id}
 * Fetch complete teacher profile from database
 */
export const getTeacherProfile = async (teacherId) => {
  try {
    console.log('📡 Fetching teacher profile for ID:', teacherId)
    const response = await axios.get(`http://localhost:8080/teacher/${teacherId}`)
    console.log('✅ Teacher profile fetched:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Failed to fetch teacher profile:', error.message)
    return getStoredTeacherData() || {
      id: teacherId,
      firstName: 'Teacher',
      lastName: 'User',
      mail: 'teacher@example.com',
      streamOrSubject: 'Subject'
    }
  }
}

/**
 * ✅ 3. GET TEACHER CLASSES - GET /teacher/{id}/classes
 * Fetch classes assigned to teacher
 */
export const getTeacherClasses = async (teacherId) => {
  try {
    console.log('📡 Fetching teacher classes for ID:', teacherId)
    const response = await axios.get(`http://localhost:8080/teacher/${teacherId}/classes`)
    console.log('✅ Teacher classes fetched:', response.data)
    return response.data || []
  } catch (error) {
    console.error('❌ Failed to fetch teacher classes:', error.message)
    // Fallback sample data
    return [
      { id: 1, name: 'Java Programming', students: 45 },
      { id: 2, name: 'Web Development', students: 38 }
    ]
  }
}

/**
 * ✅ 4. GET ASSIGNED STUDENTS - GET /student/getAll
 * Fetch all students (count for teacher dashboard)
 */
export const getTeacherStudents = async (teacherId) => {
  try {
    console.log('📡 Fetching students for teacher ID:', teacherId)
    const response = await axios.get(`http://localhost:8080/student/getAll`)
    console.log('✅ Students fetched:', response.data)
    return response.data || []
  } catch (error) {
    console.error('❌ Failed to fetch students:', error.message)
    return []
  }
}

// ═══════════════════════════════════════════════════════════════
// 📢 NOTICE MANAGEMENT FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * ✅ GET ALL NOTICES - GET /notice
 * Fetch all notices from the system
 */
export const getAllNotices = async () => {
  try {
    console.log('📡 Fetching all notices')
    const response = await axios.get('http://localhost:8080/student/Notice')
    console.log('✅ Notices fetched:', response.data)
    return response.data || []
  } catch (error) {
    console.error('❌ Failed to fetch notices:', error.message)
    return []
  }
}

/**
 * ✅ CREATE NOTICE - POST /notice
 * Add a new notice to the system
 */
export const createNotice = async (noticeData) => {
  try {
    console.log('📡 Creating new notice:', noticeData)
    const response = await axios.post('http://localhost:8080/student/Notice', noticeData)
    console.log('✅ Notice created:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Failed to create notice:', error.message)
    throw new Error(error.response?.data?.message || 'Failed to create notice')
  }
}

/**
 * ✅ DELETE NOTICE - DELETE /notice/{id}
 * Remove a notice from the system
 */
export const deleteNotice = async (noticeId) => {
  try {
    console.log('📡 Deleting notice ID:', noticeId)
    const response = await axios.delete(`http://localhost:8080/student/Notice/${noticeId}`)
    console.log('✅ Notice deleted:', noticeId)
    return response.data
  } catch (error) {
    console.error('❌ Failed to delete notice:', error.message)
    throw new Error(error.response?.data?.message || 'Failed to delete notice')
  }
}

// ═══════════════════════════════════════════════════════════════
// 🛠️ UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get stored teacher data from localStorage
 */
export const getStoredTeacherData = () => {
  try {
    const teacher = localStorage.getItem('teacher')
    return teacher ? JSON.parse(teacher) : null
  } catch (err) {
    console.error('❌ Error parsing stored teacher data:', err)
    return null
  }
}

/**
 * Logout teacher - clear storage
 */
export const teacherLogout = () => {
  localStorage.removeItem('teacher')
  localStorage.removeItem('teacherToken')
  console.log('✅ Teacher logged out')
}

/**
 * Check if teacher is authenticated
 */
export const isTeacherAuthenticated = () => {
  return !!getStoredTeacherData() && !!localStorage.getItem('teacherToken')
}
