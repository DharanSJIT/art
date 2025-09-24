const express = require('express')
const { body } = require('express-validator')
const authController = require('../controllers/authController')
const { auth } = require('../middleware/auth')
const { handleValidationErrors } = require('../middleware/validation')

const router = express.Router()

// Public routes
router.post('/signup',
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
  ],
  handleValidationErrors,
  authController.signup
)

router.post('/login',
  authController.login
)

// Protected routes
router.get('/profile', auth, authController.getProfile)

router.put('/profile', 
  auth,
  authController.updateProfile
)

router.post('/set-user-type', 
  auth,
  authController.setUserType
)

router.post('/logout', auth, authController.logout)

module.exports = router
