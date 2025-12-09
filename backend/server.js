const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5001; // Fixed: Actually use 5001

// -----------------------------
// CORS Middleware (FIXED)
// -----------------------------
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:3002',
    'http://localhost:5001',
    'https://art-indol-seven.vercel.app' // Your production frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

// Apply CORS once with all origins
app.use(cors(corsOptions))

// Handle preflight requests
app.options('*', cors(corsOptions))

// -----------------------------
// Middleware
// -----------------------------
app.use(express.json())

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`)
  next()
})

// -----------------------------
// Mock products data
// -----------------------------
const mockProducts = [
  {
    id: 1,
    name: 'Handmade Ceramic Vase',
    price: 45.99,
    originalPrice: 59.99,
    image: 'https://picsum.photos/400/400?random=1',
    seller: {
      name: 'John Potter',
      location: 'Chennai, Tamil Nadu',
      rating: 4.8,
      verified: true
    },
    category: 'pottery',
    rating: 4.7,
    reviewCount: 23,
    description: 'Beautiful handcrafted ceramic vase',
    deliveryTime: '5-7 days',
    inStock: true,
    stockCount: 12,
    isPopular: true,
    discount: 23,
    tags: ['handmade', 'ceramic'],
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Wooden Coffee Table',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://picsum.photos/400/400?random=2',
    seller: {
      name: 'Sarah Carpenter',
      location: 'Bangalore, Karnataka',
      rating: 4.9,
      verified: true
    },
    category: 'woodwork',
    rating: 4.8,
    reviewCount: 45,
    description: 'Handcrafted oak coffee table',
    deliveryTime: '10-14 days',
    inStock: true,
    stockCount: 5,
    isPopular: false,
    discount: 20,
    tags: ['furniture', 'oak'],
    createdAt: '2024-01-10T14:20:00Z'
  }
]

// -----------------------------
// Routes
// -----------------------------

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    port: PORT
  })
})

// ✅ REVERTED: Loan evaluation route using your original Render agentic AI
app.post('/api/loan/evaluate', async (req, res) => {
  try {
    console.log('📥 Loan evaluation request received:', req.body)
    
    // Validate request
    if (!req.body.seller_id || !req.body.craft_type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: seller_id or craft_type'
      })
    }
    
    console.log('📤 Forwarding to agentic AI...')
    
    // Forward the request to your agentic AI on Render
    const response = await axios.post(
      'https://artisan-loan-agent.onrender.com/loan/evaluate',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 120000 // 2 minutes timeout
      }
    )
    
    console.log('📥 Agentic AI response received:', response.data)
    
    // Return the AI response to frontend
    res.json({
      success: true,
      data: response.data,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Loan evaluation error:', error.message)
    
    let errorMessage = 'Loan evaluation failed'
    let statusCode = 500
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'AI service timeout - analysis taking longer than expected'
      statusCode = 408
    } else if (error.response) {
      errorMessage = error.response.data?.message || `AI service error: ${error.response.status}`
      statusCode = error.response.status >= 400 && error.response.status < 500 ? 400 : 500
    } else if (error.request) {
      errorMessage = 'Cannot reach AI service - service may be down'
      statusCode = 503
    }
    
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      timestamp: new Date().toISOString()
    })
  }
})

// Loan health check
app.get('/api/loan/health', (req, res) => {
  res.json({
    success: true,
    message: 'Loan evaluation service is running',
    agentic_ai_url: 'https://artisan-loan-agent.onrender.com/loan/evaluate',
    timestamp: new Date().toISOString()
  })
})

// Products API
app.get('/api/products', (req, res) => {
  console.log('Products API called')
  res.json({
    success: true,
    data: {
      products: mockProducts,
      pagination: {
        page: 1,
        limit: 12,
        total: mockProducts.length,
        totalPages: 1
      }
    }
  })
})

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const product = mockProducts.find(p => p.id === parseInt(id))
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    })
  }
  
  res.json({
    success: true,
    data: { product }
  })
})

// Import auth routes (make sure this file exists)
try {
  const authRoutes = require('./src/routes/auth')
  app.use('/api/auth', authRoutes)
  console.log('✅ Auth routes loaded successfully')
} catch (error) {
  console.warn('⚠️ Auth routes not found, creating simple auth endpoints...')
  
  // Simple auth endpoints if auth routes file doesn't exist
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: '1',
          name: 'John Doe',
          email: email,
          userType: 'customer'
        },
        token: 'mock-jwt-token'
      }
    })
  })

  app.post('/api/auth/signup', (req, res) => {
    const { name, email, password } = req.body
    
    res.json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: '1',
          name: name,
          email: email,
          userType: null
        },
        token: 'mock-jwt-token'
      }
    })
  })

  app.get('/api/auth/profile', (req, res) => {
    res.json({
      success: true,
      data: {
        user: {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
          userType: 'customer'
        }
      }
    })
  })
}

// -----------------------------
// 404 handler
// -----------------------------
app.use('*', (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`)
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  })
})

// -----------------------------
// Error handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

// -----------------------------
// Start server
// -----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🛍️  Products API: http://localhost:${PORT}/api/products`)
  console.log(`🏦 Loan evaluation: http://localhost:${PORT}/api/loan/evaluate`)
  console.log(`👤 Auth endpoints: http://localhost:${PORT}/api/auth/*`)
  console.log(`🌐 CORS enabled for: localhost:3000-3002`)
})
