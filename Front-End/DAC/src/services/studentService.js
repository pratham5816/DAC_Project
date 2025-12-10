import axios from 'axios'


// ═══════════════════════════════════════════════════════════════
// 📌 STUDENT API FUNCTIONS (Service Layer)
// ═══════════════════════════════════════════════════════════════

/**
 * ✅ 1. LOGIN - POST /student/login
 * Authenticate student with email and password
 */
export const studentLogin = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8080/student/checkLogin', {
      email: email,
      password: password
    })
    console.log('✅ Login response:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message)
    throw new Error(error.response?.data?.message || 'Invalid email or password')
  }
}

/**
 * ✅ 2. GET STUDENT PROFILE - GET /student/{id}
 * Fetch complete student profile from database
 */
export const getStudentProfile = async (studentId) => {
  try {
    const response = await axios.get(`http://localhost:8080/student/${studentId}`)
    console.log('✅ Profile fetched:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Failed to fetch profile:', error.message)
    // Fallback data
    return getStoredStudentData() || {
      id: studentId,
      firstName: 'Student',
      lastName: 'User',
      mail: 'student@example.com',
      gpa: 0
    }
  }
}

/**
 * ✅ 3. GET STUDENT GRADES - GET /student/{id}/grades
 * Fetch grades list for a student
 */
export const getStudentGrades = async (studentId) => {
  try {
    const response = await axios.get(`http://localhost:8080/student/${studentId}/grades`)
    console.log('✅ Grades fetched:', response.data)
    return response.data || []
  } catch (error) {
    console.error('❌ Failed to fetch grades:', error.message)
    // Fallback sample data
    return [
      { subject: 'Mathematics', grade: 'A', percentage: 85, score: 85 },
      { subject: 'Physics', grade: 'A-', percentage: 82, score: 82 }
    ]
  }
}

/**
 * ✅ 7. GET RECENT NOTICES - GET /notice
 * Fetch all notices from the system
 */
export const getRecentNotices = async (limit = 10) => {
  try {
    console.log('📡 Fetching notices from: http://localhost:8080/student/Notice')
    const response = await axios.get(`http://localhost:8080/student/Notice`)
    console.log('✅ Notices API Response:', response.data)
    console.log('✅ Number of notices:', response.data?.length || 0)
    // Return all notices or limit them
    const result = Array.isArray(response.data) ? response.data.slice(0, limit) : []
    console.log('✅ Returning notices (after limit):', result)
    return result
  } catch (error) {
    console.error('❌ Failed to fetch notices:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    })
    // Fallback empty array
    return []
  }
}

/**
 * ❌ 4. GET STUDENT ATTENDANCE - GET /student/{id}/attendance
 * COMMENTED OUT - Not in use
 */
// export const getStudentAttendance = async (studentId) => {
//   try {
//     const response = await apiClient.get(`/student/${studentId}/attendance`)
//     console.log('✅ Attendance fetched:', response.data)
//     return response.data
//   } catch (error) {
//     console.error('❌ Failed to fetch attendance:', error.message)
//     return { percentage: 85, totalClasses: 30, attendedClasses: 25 }
//   }
// }

/**
 * ❌ 5. GET STUDENT ASSIGNMENTS - GET /student/{id}/assignments
 * COMMENTED OUT - Not in use
 */
// export const getStudentAssignments = async (studentId) => {
//   try {
//     const response = await apiClient.get(`/student/${studentId}/assignments`)
//     console.log('✅ Assignments fetched:', response.data)
//     return response.data
//   } catch (error) {
//     console.error('❌ Failed to fetch assignments:', error.message)
//     return { completed: 0, total: 0, pending: 0 }
//   }
// }

/**
 * ❌ 8. GET STUDENT COURSES - GET /student/{id}/courses
 * COMMENTED OUT - Not in use
 */
// export const getStudentCourses = async (studentId) => {
//   try {
//     const response = await axios.get(`http://localhost:8080/student/${studentId}/courses`)
//     console.log('✅ Courses fetched:', response.data)
//     return response.data || []
//   } catch (error) {
//     console.error('❌ Failed to fetch courses:', error.message)
//     return []
//   }
// }



/**
 * ❌ 8. GET STUDENT COURSES - GET /student/{id}/courses
 * COMMENTED OUT - Not in use
 */
// export const getStudentCourses = async (studentId) => {
//   try {
//     const response = await apiClient.get(`/student/${studentId}/courses`)
//     console.log('✅ Courses fetched:', response.data)
//     return response.data || []
//   } catch (error) {
//     console.error('❌ Failed to fetch courses:', error.message)
//     return []
//   }
// }

// ═══════════════════════════════════════════════════════════════
// 🛠️ UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get stored student data from localStorage
 */
export const getStoredStudentData = () => {
  try {
    const student = localStorage.getItem('student')
    return student ? JSON.parse(student) : null
  } catch (err) {
    console.error('❌ Error parsing stored student data:', err)
    return null
  }
}

/**
 * Logout student - clear storage
 */
export const studentLogout = () => {
  localStorage.removeItem('student')
  localStorage.removeItem('token')
  console.log('✅ Student logged out')
}

/**
 * Check if student is authenticated
 */
export const isStudentAuthenticated = () => {
  return !!getStoredStudentData() && !!localStorage.getItem('token')
}

/**
 * Get axios instance (for advanced usage)
 */

