// import React, { createContext, useContext, useState, useEffect } from 'react'
// import { auth } from '../firebase'
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
// import axios from 'axios'
// import toast from 'react-hot-toast'

// const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'

//   const login = async (email, password) => {
//     try {
//       // Sign in with Firebase
//       const userCredential = await signInWithEmailAndPassword(auth, email, password)
//       const idToken = await userCredential.user.getIdToken()

//       // Send token to backend for login
//       const response = await axios.post(`${API_BASE_URL}/auth/login`, {}, {
//         headers: {
//           'Authorization': `Bearer ${idToken}`
//         }
//       })

//       if (response.data.success) {
//         localStorage.setItem('token', idToken)
//         setCurrentUser(response.data.data.user)
//         toast.success('Login successful!')
//         return response.data
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || error.message || 'Login failed'
//       toast.error(message)
//       throw error
//     }
//   }

//   const signup = async (email, password, name) => {
//     try {
//       // Create user with Firebase
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//       const idToken = await userCredential.user.getIdToken()

//       // Send token and name to backend for signup
//       const response = await axios.post(`${API_BASE_URL}/auth/signup`, { name }, {
//         headers: {
//           'Authorization': `Bearer ${idToken}`
//         }
//       })

//       if (response.data.success) {
//         localStorage.setItem('token', idToken)
//         setCurrentUser(response.data.data.user)
//         toast.success('Account created successfully!')
//         return response.data
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || error.message || 'Signup failed'
//       toast.error(message)
//       throw error
//     }
//   }

//   const logout = async () => {
//     try {
//       await signOut(auth)
//       localStorage.removeItem('token')
//       setCurrentUser(null)
//       toast.success('Logged out successfully')
//     } catch (error) {
//       toast.error('Logout failed')
//     }
//   }

//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     API_BASE_URL,
//     loading
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const idToken = await user.getIdToken()
//         localStorage.setItem('token', idToken)
//         axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`

//         // Get user profile from backend
//         try {
//           const response = await axios.get(`${API_BASE_URL}/auth/profile`)
//           if (response.data.success) {
//             setCurrentUser(response.data.data.user)
//           }
//         } catch (error) {
//           console.error('Failed to get user profile:', error)
//           localStorage.removeItem('token')
//           delete axios.defaults.headers.common['Authorization']
//         }
//       } else {
//         localStorage.removeItem('token')
//         delete axios.defaults.headers.common['Authorization']
//         setCurrentUser(null)
//       }
//       setLoading(false)
//     })

//     return unsubscribe
//   }, [API_BASE_URL])

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }



// AuthContext.jsx - Firebase Version
import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { auth } from '../firebase' // Your Firebase config
import toast from 'react-hot-toast'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'

  // Create axios instance for backend calls
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  })

  // Request interceptor to add Firebase token
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken()
          config.headers.Authorization = `Bearer ${token}`
        } catch (error) {
          console.error('Failed to get Firebase token:', error)
        }
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  const signup = async (email, password, name) => {
    try {
      console.log('🔐 Creating Firebase user...')
      
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update display name
      await updateProfile(user, {
        displayName: name
      })

      toast.success('Account created successfully!')
      return { success: true, user }
    } catch (error) {
      console.error('❌ Signup error:', error)
      
      let message = 'Signup failed'
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email is already registered'
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak'
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address'
      }
      
      toast.error(message)
      throw new Error(message)
    }
  }

  const login = async (email, password) => {
    try {
      console.log('🔐 Logging in with Firebase...')
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      toast.success('Login successful!')
      return { success: true, user }
    } catch (error) {
      console.error('❌ Login error:', error)
      
      let message = 'Login failed'
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email'
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password'
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address'
      }
      
      toast.error(message)
      throw new Error(message)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      toast.success('Logged out successfully', {
        style: {
          background: '#dc2626',
          color: '#fff',
        },
        iconTheme: {
          primary: '#dc2626',
          secondary: '#fff',
        },
      })
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout')
    }
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    axiosInstance,
    API_BASE_URL,
    loading,
    isAuthenticated: !!currentUser
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔍 Auth state changed:', user ? 'User logged in' : 'User logged out')
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}