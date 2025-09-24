import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

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

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      })
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token)
        setCurrentUser(response.data.data.user)
        toast.success('Login successful!')
        return response.data
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      throw error
    }
  }

  const signup = async (email, password, name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        email,
        password,
        name
      })
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token)
        setCurrentUser(response.data.data.user)
        toast.success('Account created successfully!')
        return response.data
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'
      toast.error(message)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
    toast.success('Logged out successfully')
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    API_BASE_URL,
    loading
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Verify token and get user data
      axios.get(`${API_BASE_URL}/auth/profile`)
        .then(response => {
          if (response.data.success) {
            setCurrentUser(response.data.data.user)
          }
        })
        .catch(() => {
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [API_BASE_URL])

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
