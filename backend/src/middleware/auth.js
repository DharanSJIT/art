const { getAuth, getFirestore } = require('../services/firebaseService')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }

    // Verify Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(token)

    // Get user from Firestore using Firebase UID
    const db = getFirestore()
    const userDoc = await db.collection('users').doc(decodedToken.uid).get()

    if (!userDoc.exists) {
      return res.status(401).json({
        success: false,
        message: 'User not found.'
      })
    }

    req.user = {
      id: decodedToken.uid,
      firebaseUid: decodedToken.uid,
      email: decodedToken.email,
      ...userDoc.data()
    }

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({
      success: false,
      message: 'Token is not valid.'
    })
  }
}

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (token) {
      const decodedToken = await getAuth().verifyIdToken(token)
      const db = getFirestore()
      const userDoc = await db.collection('users').doc(decodedToken.uid).get()

      if (userDoc.exists) {
        req.user = {
          id: decodedToken.uid,
          firebaseUid: decodedToken.uid,
          email: decodedToken.email,
          ...userDoc.data()
        }
      }
    }

    next()
  } catch (error) {
    // Continue without user info if token is invalid
    next()
  }
}

const requireSeller = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    })
  }

  if (req.user.userType !== 'seller') {
    return res.status(403).json({
      success: false,
      message: 'Seller access required.'
    })
  }

  next()
}

const requireCustomer = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    })
  }

  if (req.user.userType !== 'customer') {
    return res.status(403).json({
      success: false,
      message: 'Customer access required.'
    })
  }

  next()
}

module.exports = {
  auth,
  optionalAuth,
  requireSeller,
  requireCustomer
}
