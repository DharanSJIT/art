const { getAuth, getFirestore } = require('../services/firebaseService')
const emailService = require('../services/emailService')

const authController = {
  // Register user - expects Firebase ID token in Authorization header
  signup: async (req, res) => {
    try {
      const { name } = req.body
      const db = getFirestore()

      // Firebase UID from middleware
      const firebaseUid = req.user.firebaseUid
      const email = req.user.email

      // Check if user already exists
      const userDoc = await db.collection('users').doc(firebaseUid).get()

      if (userDoc.exists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        })
      }

      // Create user document
      const userData = {
        name,
        email,
        userType: null, // Will be set when user chooses type
        isActive: true,
        isEmailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      await db.collection('users').doc(firebaseUid).set(userData)

      // Send welcome email
      await emailService.sendWelcomeEmail(email, name)

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: firebaseUid,
            name,
            email,
            userType: null,
            isActive: true
          }
        }
      })
    } catch (error) {
      console.error('Signup error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to register user'
      })
    }
  },

  // Login user - expects Firebase ID token in Authorization header
  login: async (req, res) => {
    try {
      const db = getFirestore()
      const firebaseUid = req.user.firebaseUid

      // Get user from Firestore
      const userDoc = await db.collection('users').doc(firebaseUid).get()

      if (!userDoc.exists) {
        return res.status(400).json({
          success: false,
          message: 'User not found. Please sign up first.'
        })
      }

      const userData = userDoc.data()

      // Check if account is active
      if (!userData.isActive) {
        return res.status(400).json({
          success: false,
          message: 'Account is deactivated. Please contact support.'
        })
      }

      // Update last login
      await userDoc.ref.update({
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: firebaseUid,
            name: userData.name,
            email: userData.email,
            userType: userData.userType,
            isActive: userData.isActive
          }
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to login'
      })
    }
  },
    // Get user profile
  getProfile: async (req, res) => {
    try {
      const db = getFirestore()
      const userDoc = await db.collection('users').doc(req.user.id).get()

      if (!userDoc.exists) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      const userData = userDoc.data()

      res.json({
        success: true,
        data: {
          user: {
            id: userDoc.id,
            ...userData
          }
        }
      })
    } catch (error) {
      console.error('Get profile error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to get user profile'
      })
    }
  },

  // Update user profile
  updateProfile: async (req, res) => {
    try {
      const { name, phone, address } = req.body
      const db = getFirestore()

      const updateData = {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(address && { address }),
        updatedAt: new Date().toISOString()
      }

      await db.collection('users').doc(req.user.id).update(updateData)

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updateData
      })
    } catch (error) {
      console.error('Update profile error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to update profile'
      })
    }
  },

  // Set user type (customer/seller)
  setUserType: async (req, res) => {
    try {
      const { userType } = req.body
      const db = getFirestore()

      if (!['customer', 'seller'].includes(userType)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user type'
        })
      }

      await db.collection('users').doc(req.user.id).update({
        userType,
        updatedAt: new Date().toISOString()
      })

      res.json({
        success: true,
        message: 'User type updated successfully',
        data: { userType }
      })
    } catch (error) {
      console.error('Set user type error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to update user type'
      })
    }
  },

  // Logout user
  logout: async (req, res) => {
    try {
      // In a production app, you might want to blacklist the token
      // For now, we'll just return success
      res.json({
        success: true,
        message: 'Logout successful'
      })
    } catch (error) {
      console.error('Logout error:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to logout'
      })
    }
  }
}

module.exports = authController
