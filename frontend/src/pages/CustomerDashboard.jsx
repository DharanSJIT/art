// src/pages/CustomerDashboard.jsx
import React, { useState, useEffect, useMemo } from 'react'
import { 
  Search, ShoppingCart, Star, MapPin, Filter, Heart, User, Bell, 
  Grid, List, ChevronDown, Truck, Shield, MessageCircle, X, 
  SlidersHorizontal, Package, Clock, Verified, Eye, Plus,
  ArrowUpDown, CheckCircle, AlertCircle
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const CustomerDashboard = () => {
  // State management
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  
  // User state (in real app, this would come from auth context)
  const [currentUser] = useState({ 
    name: 'John Doe', 
    avatar: null,
    location: 'Mumbai, Maharashtra',
    id: 'user123'
  })

  const navigate = useNavigate()

  // Constants
  const categories = [
    { value: 'all', label: 'All Categories', count: 0 },
    { value: 'pottery', label: 'Pottery', count: 0 },
    { value: 'woodwork', label: 'Woodwork', count: 0 },
    { value: 'textiles', label: 'Textiles', count: 0 },
    { value: 'jewelry', label: 'Jewelry', count: 0 },
    { value: 'metalwork', label: 'Metalwork', count: 0 },
    { value: 'leather', label: 'Leather Goods', count: 0 },
    { value: 'glass', label: 'Glassware', count: 0 },
    { value: 'painting', label: 'Paintings', count: 0 },
    { value: 'sculpture', label: 'Sculptures', count: 0 }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: Clock },
    { value: 'price-low', label: 'Price: Low to High', icon: ArrowUpDown },
    { value: 'price-high', label: 'Price: High to Low', icon: ArrowUpDown },
    { value: 'rating', label: 'Highest Rated', icon: Star },
    { value: 'popular', label: 'Most Popular', icon: Heart },
    { value: 'discount', label: 'Best Deals', icon: Package }
  ]

  // Effects
  useEffect(() => {
    fetchProducts()
    loadCartItems()
    loadWishlist()
  }, [])

  useEffect(() => {
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCategory, priceRange, sortBy])

  // Data fetching
  const fetchProducts = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from API first
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URLl || 'http://localhost:5000/apii'}/products`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data.products) {
            setProducts(data.data.products)
            setLoading(false)
            return
          }
        }
      } catch (apiError) {
        console.log('API not available, using mock data')
      }
      
      // Fallback to comprehensive mock data
      setTimeout(() => {
        const mockProducts = [
          {
            id: 1,
            name: 'Handmade Ceramic Vase with Traditional Blue Pottery Patterns',
            price: 45.99,
            originalPrice: 59.99,
            image: 'https://m.media-amazon.com/images/I/71Oz0k1FovL.jpg',
            images: [
              'https://picsum.photos/400/400?random=1',
              
            ],
            seller: {
              id: 'seller1',
              name: 'John Potter',
              location: 'Chennai, Tamil Nadu',
              rating: 4.8,
              verified: true,
              responseTime: '2 hours',
              totalSales: 156,
              memberSince: '2020'
            },
            category: 'pottery',
            rating: 4.7,
            reviewCount: 23,
            description: 'Beautiful handcrafted ceramic vase with traditional Indian blue pottery patterns. Each piece is unique and made with love by skilled artisans.',
            deliveryTime: '5-7 days',
            inStock: true,
            stockCount: 12,
            isPopular: true,
            isFeatured: false,
            discount: 23,
            tags: ['handmade', 'ceramic', 'traditional', 'home-decor', 'blue-pottery'],
            specifications: {
              material: 'High-quality ceramic',
              dimensions: '8" H x 4" W',
              weight: '1.2 lbs',
              care: 'Dishwasher safe, handle with care'
            },
            createdAt: '2024-01-15T10:30:00Z',
            shippingCost: 5.99,
            freeShipping: false
          },
          {
            id: 2,
            name: 'Bamboo Crafts',
            price: 199.99,
            originalPrice: 249.99,
            image: 'https://5.imimg.com/data5/SELLER/Default/2022/7/HY/CM/JB/139461272/bamboo-handicrafts-1531714725-4104928.jpeg',
            // images: [
            //   'https://picsum.photos/400/400?random=5',
            //   'https://picsum.photos/400/400?random=6',
            //   'https://picsum.photos/400/400?random=7'
            // ],
            seller: {
              id: 'seller2',
              name: 'Sarah Carpenter',
              location: 'Bangalore, Karnataka',
              rating: 4.9,
              verified: true,
              responseTime: '1 hour',
              totalSales: 89,
              memberSince: '2019'
            },
            category: 'woodwork',
            rating: 4.8,
            reviewCount: 45,
            description: 'Handcrafted solid oak coffee table with intricate carved details. Perfect centerpiece for your living room.',
            deliveryTime: '10-14 days',
            inStock: true,
            stockCount: 5,
            isPopular: false,
            isFeatured: true,
            discount: 20,
            tags: ['furniture', 'oak', 'handcrafted', 'living-room', 'carved'],
            specifications: {
              material: 'Solid Oak Wood',
              dimensions: '42" L x 24" W x 16" H',
              weight: '35 lbs',
              care: 'Regular dusting, avoid direct sunlight'
            },
            createdAt: '2024-01-10T14:20:00Z',
            shippingCost: 0,
            freeShipping: true
          },
          {
            id: 3,
            name: 'Pearl Jewelry',
            price: 89.99,
            originalPrice: 119.99,
            image: 'https://chandranipearls.in/cdn/shop/files/S24264.jpg?v=1737288976',
          
            seller: {
              id: 'seller3',
              name: 'Priya Weaver',
              location: 'Varanasi, Uttar Pradesh',
              rating: 4.6,
              verified: true,
              responseTime: '3 hours',
              totalSales: 234,
              memberSince: '2021'
            },
            category: 'textiles',
            rating: 4.5,
            reviewCount: 18,
            description: 'Luxurious handwoven pure silk scarf featuring traditional Banarasi motifs. A timeless piece of Indian craftsmanship.',
            deliveryTime: '3-5 days',
            inStock: true,
            stockCount: 8,
            isPopular: true,
            isFeatured: false,
            discount: 25,
            tags: ['silk', 'handwoven', 'traditional', 'fashion', 'banarasi'],
            specifications: {
              material: '100% Pure Silk',
              dimensions: '70" L x 35" W',
              weight: '0.3 lbs',
              care: 'Dry clean only'
            },
            createdAt: '2024-01-12T09:15:00Z',
            shippingCost: 3.99,
            freeShipping: false
          },
          {
            id: 4,
            name: 'Clay Pots',
            price: 129.99,
            originalPrice: 159.99,
            image: 'https://images.picxy.com/cache/2020/9/11/52cbac73ab274e8df895ff5dca181cfd.jpg',
           
            seller: {
              id: 'seller4',
              name: 'Rajesh Jeweller',
              location: 'Jaipur, Rajasthan',
              rating: 4.9,
              verified: true,
              responseTime: '30 mins',
              totalSales: 445,
              memberSince: '2018'
            },
            category: 'jewelry',
            rating: 4.9,
            reviewCount: 67,
            description: 'Handcrafted sterling silver pendant necklace with natural gemstone. Traditional Rajasthani design meets modern elegance.',
            deliveryTime: '7-10 days',
            inStock: true,
            stockCount: 15,
            isPopular: false,
            isFeatured: true,
            discount: 19,
            tags: ['silver', 'jewelry', 'traditional', 'gemstone', 'rajasthani'],
            specifications: {
              material: '925 Sterling Silver',
              dimensions: 'Chain: 18", Pendant: 2" x 1.5"',
              weight: '0.8 oz',
              care: 'Clean with soft cloth'
            },
            createdAt: '2024-01-08T16:45:00Z',
            shippingCost: 0,
            freeShipping: true
          },
          {
            id: 5,
            name: 'Terracotta Art',
            price: 159.99,
            originalPrice: 199.99,
            image: 'https://www.mptourism.com/web/image/catalog/2024/TerracottaArt-of-Madhya-Pradesh1.jpg',
            
            seller: {
              id: 'seller5',
              name: 'Ahmed Leather',
              location: 'Kanpur, Uttar Pradesh',
              rating: 4.7,
              verified: true,
              responseTime: '4 hours',
              totalSales: 178,
              memberSince: '2020'
            },
            category: 'leather',
            rating: 4.6,
            reviewCount: 34,
            description: 'Genuine leather messenger bag with vintage finish and brass hardware. Perfect for professionals and students alike.',
            deliveryTime: '5-8 days',
            inStock: true,
            stockCount: 6,
            isPopular: true,
            isFeatured: false,
            discount: 20,
            tags: ['leather', 'vintage', 'messenger', 'professional', 'brass'],
            specifications: {
              material: 'Genuine Leather',
              dimensions: '15" L x 12" H x 4" D',
              weight: '2.5 lbs',
              care: 'Use leather conditioner monthly'
            },
            createdAt: '2024-01-05T11:30:00Z',
            shippingCost: 7.99,
            freeShipping: false
          },
          {
            id: 6,
            name: 'Wooden Carvings',
            price: 79.99,
            originalPrice: 99.99,
            image: 'https://hanumantimbers.com/wp-content/uploads/2022/06/1.jpg',
           
            seller: {
              id: 'seller6',
              name: 'Vikram Blacksmith',
              location: 'Jodhpur, Rajasthan',
              rating: 4.8,
              verified: true,
              responseTime: '6 hours',
              totalSales: 92,
              memberSince: '2021'
            },
            category: 'metalwork',
            rating: 4.7,
            reviewCount: 29,
            description: 'Traditional hand-forged iron candle stand set with rustic finish. Adds warmth and character to any space.',
            deliveryTime: '6-9 days',
            inStock: false,
            stockCount: 0,
            isPopular: false,
            isFeatured: false,
            discount: 20,
            tags: ['iron', 'forged', 'candle', 'rustic', 'traditional'],
            specifications: {
              material: 'Hand-forged Iron',
              dimensions: 'Set of 3: 6", 8", 10" heights',
              weight: '4.5 lbs',
              care: 'Wipe with dry cloth, apply oil to prevent rust'
            },
            createdAt: '2024-01-02T13:20:00Z',
            shippingCost: 6.99,
            freeShipping: false
          },
          {
            id: 7,
            name: 'Jute Bags',
            price: 67.99,
            originalPrice: 84.99,
            image: 'https://m.media-amazon.com/images/I/81ZvyWAG10L._UF1000,1000_QL80_.jpg',
            seller: {
              id: 'seller7',
              name: 'Maya Glass Artist',
              location: 'Firozabad, Uttar Pradesh',
              rating: 4.5,
              verified: true,
              responseTime: '8 hours',
              totalSales: 67,
              memberSince: '2022'
            },
            category: 'Stone Sculptures',
            rating: 4.4,
            reviewCount: 15,
            description: 'Elegant handblown glass decorative bowl with gold rim detail. Perfect for fruits or as a centerpiece.',
            deliveryTime: '4-6 days',
            inStock: true,
            stockCount: 3,
            isPopular: false,
            isFeatured: false,
            discount: 20,
            tags: ['glass', 'handblown', 'decorative', 'gold-rim', 'elegant'],
            specifications: {
              material: 'Borosilicate Glass',
              dimensions: '10" diameter x 4" H',
              weight: '1.8 lbs',
              care: 'Hand wash only'
            },
            createdAt: '2024-01-14T08:10:00Z',
            shippingCost: 4.99,
            freeShipping: false
          },
          {
            id: 8,
            name: 'Acrylic Landscape Painting on Canvas',
            price: 245.99,
            originalPrice: 299.99,
            image: 'https://cangguco.com/cdn/shop/products/4a74d11f-b74f-4df7-b6a9-184555637fbf_3024x.jpg?v=1571831042',
            images: [
              'https://picsum.photos/400/400?random=24',
              'https://picsum.photos/400/400?random=25'
            ],
            seller: {
              id: 'seller8',
              name: 'Arjun Artist',
              location: 'Goa, India',
              rating: 4.9,
              verified: true,
              responseTime: '12 hours',
              totalSales: 23,
              memberSince: '2023'
            },
            category: 'painting',
            rating: 4.8,
            reviewCount: 8,
            description: 'Original acrylic landscape painting on canvas. Captures the serene beauty of Goan coastline at sunset.',
            deliveryTime: '7-12 days',
            inStock: true,
            stockCount: 1,
            isPopular: false,
            isFeatured: true,
            discount: 18,
            tags: ['painting', 'acrylic', 'landscape', 'original', 'canvas'],
            specifications: {
              material: 'Acrylic on Canvas',
              dimensions: '24" x 18"',
              weight: '2.2 lbs',
              care: 'Avoid direct sunlight, dust gently'
            },
            createdAt: '2024-01-13T15:25:00Z',
            shippingCost: 0,
            freeShipping: true
          }
        ]
        
        setProducts(mockProducts)
        setLoading(false)
      }, 1500)
    } catch (error) {
      toast.error('Failed to load products')
      setLoading(false)
    }
  }

  const loadCartItems = () => {
    try {
      const saved = localStorage.getItem('handmade_nexus_cart')
      if (saved) {
        setCartItems(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading cart items:', error)
    }
  }

  const loadWishlist = () => {
    try {
      const saved = localStorage.getItem('handmade_nexus_wishlist')
      if (saved) {
        setWishlist(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading wishlist:', error)
    }
  }

  const saveCartItems = (items) => {
    try {
      localStorage.setItem('handmade_nexus_cart', JSON.stringify(items))
      setCartItems(items)
    } catch (error) {
      console.error('Error saving cart items:', error)
    }
  }

  const saveWishlist = (items) => {
    try {
      localStorage.setItem('handmade_nexus_wishlist', JSON.stringify(items))
      setWishlist(items)
    } catch (error) {
      console.error('Error saving wishlist:', error)
    }
  }

  // Computed values
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      
      const matchesMinPrice = priceRange.min === '' || product.price >= parseFloat(priceRange.min)
      const matchesMaxPrice = priceRange.max === '' || product.price <= parseFloat(priceRange.max)
      
      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
    })
  }, [products, searchTerm, selectedCategory, priceRange])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'popular':
          return b.reviewCount - a.reviewCount
        case 'discount':
          return b.discount - a.discount
        case 'newest':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }
    })
    return sorted
  }, [filteredProducts, sortBy])

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  // Update categories with counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(category => ({
      ...category,
      count: category.value === 'all' 
        ? products.length 
        : products.filter(p => p.category === category.value).length
    }))
  }, [products])

  // Event handlers
  const addToCart = (product) => {
    if (!product.inStock) {
      toast.error('Product is out of stock')
      return
    }

    const existingItem = cartItems.find(item => item.id === product.id)
    let newCartItems

    if (existingItem) {
      if (existingItem.quantity >= product.stockCount) {
        toast.error('Cannot add more items. Stock limit reached.')
        return
      }
      newCartItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newCartItems = [...cartItems, { ...product, quantity: 1 }]
    }

    saveCartItems(newCartItems)
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      icon: '🛒'
    })
  }

  const toggleWishlist = (productId) => {
    const isInWishlist = wishlist.includes(productId)
    let newWishlist

    if (isInWishlist) {
      newWishlist = wishlist.filter(id => id !== productId)
      toast.success('Removed from wishlist', {
        duration: 2000,
        icon: '💔'
      })
    } else {
      newWishlist = [...wishlist, productId]
      toast.success('Added to wishlist', {
        duration: 2000,
        icon: '💝'
      })
    }

    saveWishlist(newWishlist)
  }

  const calculateDeliveryDate = (deliveryTime) => {
    const days = parseInt(deliveryTime.split('-')[1] || deliveryTime.split('-')[0]) || 7
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setPriceRange({ min: '', max: '' })
    setSortBy('newest')
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Components
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
              -{product.discount}%
            </span>
          )}
          {product.isPopular && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
              Popular
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
              Featured
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
              Out of Stock
            </span>
          )}
          {product.freeShipping && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
              Free Ship
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.id)
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
          aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-200 ${
              wishlist.includes(product.id) 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              to={`/product/${product.id}`}
              className="bg-white text-gray-900 p-2 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault()
                addToCart(product)
              }}
              disabled={!product.inStock}
              className="bg-primary-600 text-white p-2 rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Add to cart"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <Link 
            to={`/product/${product.id}`}
            className="font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200 line-clamp-2 leading-tight"
          >
            {product.name}
          </Link>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        
        {/* Seller Info */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">by {product.seller.name}</span>
          {product.seller.verified && (
            <Verified className="w-4 h-4 ml-1 text-green-500 flex-shrink-0" />
          )}
        </div>
        
        <div className="text-sm text-gray-500 mb-3 truncate">
          {product.seller.location}
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary-600">
              Rs. {product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                Rs. {product.originalPrice}
              </span>
            )}
          </div>
          {product.stockCount <= 5 && product.stockCount > 0 && (
            <span className="text-xs text-orange-600 font-medium">
              Only {product.stockCount} left
            </span>
          )}
        </div>
        
        {/* Delivery Info */}
        {/* <div className="flex items-center text-xs text-gray-500 mb-4">
          <Truck className="w-4 h-4 mr-1" />
          <span>
            Delivery by {calculateDeliveryDate(product.deliveryTime)}
            {product.freeShipping ? ' (Free)' : ` (+$${product.shippingCost})`}
          </span>
        </div>
         */}
        {/* Action Buttons */}
        <div className="flex space-x-2 mb-2">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center"
          >
            {!product.inStock ? (
              <>
                <AlertCircle className="w-4 h-4 mr-1" />
                Out of Stock
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </>
            )}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
          >
            View
          </Link>
        </div>

        {/* Contact Seller */}
        <button className="w-full text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center justify-center py-1">
          <MessageCircle className="w-4 h-4 mr-1" />
          Contact Seller
        </button>
      </div>
    </div>
  )

  const Pagination = () => {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
      const delta = 2
      const range = []
      const rangeWithDots = []

      for (let i = Math.max(2, currentPage - delta); 
           i <= Math.min(totalPages - 1, currentPage + delta); 
           i++) {
        range.push(i)
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...')
      } else {
        rangeWithDots.push(1)
      }

      rangeWithDots.push(...range)

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages)
      } else {
        rangeWithDots.push(totalPages)
      }

      return rangeWithDots
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => pageNumber !== '...' && handlePageChange(pageNumber)}
            disabled={pageNumber === '...'}
            className={`px-3 py-2 border text-sm font-medium rounded-md transition-colors ${
              pageNumber === currentPage
                ? 'border-primary-600 bg-primary-600 text-white'
                : pageNumber === '...'
                ? 'border-gray-300 text-gray-400 cursor-default'
                : 'border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HN</span>
              </div>
              <span className="text-xl font-bold text-primary-600 hidden sm:block">
                Handmade Nexus
              </span>
            </Link>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for handmade products, artisans..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                {/* <Bell className="w-6 h-6" /> */}
                {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  </span> */}
              </button>
              
              <button 
                onClick={() => navigate('/wishlist')}
                className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => navigate('/cart')}
                className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  {/* <span className="text-sm font-medium text-gray-700 hidden md:block">
                    {currentUser.name.split(' ')[0]}
                  </span> */}
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser.name.split(' ')[0]}! 👋
          </h1> */}
          <p className="text-gray-600">
            Discover unique handmade products from talented artisans across India
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              {/* <Package className="w-8 h-8 text-blue-500 mr-3" /> */}
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              {/* <Heart className="w-8 h-8 text-red-500 mr-3" /> */}
              <div>
                <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              {/* <ShoppingCart className="w-8 h-8 text-green-500 mr-3" /> */}
              <div>
                <p className="text-sm font-medium text-gray-600">Cart Items</p>
                <p className="text-2xl font-bold text-gray-900">{getCartItemCount()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              {/* <Star className="w-8 h-8 text-yellow-500 mr-3" /> */}
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.length > 0 
                    ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
          {/* Mobile Filter Toggle */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
            </button>
          </div>

          <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Category Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categoriesWithCounts.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    {category.label}
                    {category.count > 0 && (
                      <span className={`ml-2 text-xs ${
                        selectedCategory === category.value ? 'text-primary-200' : 'text-gray-500'
                      }`}>
                        ({category.count})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <h4 className="text-sm font-medium text-gray-900">Price Range:</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  />
                  <span className="text-gray-500">-</span>
                  <span className="text-sm text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  />
                </div>
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-gray-400 transition-colors"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    <span>{sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showSortDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      {sortOptions.map(option => {
                        const Icon = option.icon
                        return (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value)
                              setShowSortDropdown(false)
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                              sortBy === option.value ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{option.label}</span>
                            {sortBy === option.value && (
                              <CheckCircle className="w-4 h-4 ml-auto text-primary-600" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <p className="text-gray-600">
              Showing <span className="font-medium">{startIndex + 1}-{Math.min(startIndex + productsPerPage, sortedProducts.length)}</span> of <span className="font-medium">{sortedProducts.length}</span> products
              {selectedCategory !== 'all' && (
                <span className="text-primary-600"> in {categoriesWithCounts.find(c => c.value === selectedCategory)?.label}</span>
              )}
              {searchTerm && (
                <span className="text-primary-600"> for "{searchTerm}"</span>
              )}
            </p>
            {currentPage > 1 && (
              <p className="text-sm text-gray-500 mt-1">Page {currentPage} of {totalPages}</p>
            )}
          </div>
          
          {(searchTerm || selectedCategory !== 'all' || priceRange.min || priceRange.max) && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-lg shadow p-4">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? `We couldn't find any products matching "${searchTerm}"`
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
            </div>
            <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
              <button
                onClick={clearAllFilters}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
              >
                Show All Products
              </button>
              <Link
                to="/categories"
                className="block sm:inline-block bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors duration-200 font-medium"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        )}

        {/* Featured Section */}
       

        {/* Newsletter Signup */}
        <div className="mt-16 bg-primary-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get notified about new products, exclusive deals, and artisan stories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showSortDropdown) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowSortDropdown(false)
          }}
        />
      )}
    </div>
  )
}

export default CustomerDashboard
