const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001; // change to 5001


// -----------------------------
// CORS Middleware
// -----------------------------
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002'
]

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Handle preflight requests
app.options('*', cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// -----------------------------
// Middleware
// -----------------------------
app.use(express.json())

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
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

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

// -----------------------------
// Auth routes
// -----------------------------
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

// -----------------------------
// 404 handler
// -----------------------------
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// -----------------------------
// Error handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error('Server Error:', err)
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
})
