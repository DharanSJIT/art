// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, ShoppingCart, User, Star, MapPin, Truck, Shield, 
  Heart, ArrowRight, CheckCircle, Users, Package, Globe,
  Palette, Hammer, Scissors, Gem, Menu, X, Play,
  Award, TrendingUp, Clock, MessageCircle
} from 'lucide-react'

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Handcrafted Ceramic Vase',
      price: '₹2,499',
      originalPrice: '₹3,299',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNt53IOPLYJfPYa91y_n3lJjO54aqzSPMyxQ&s',
      seller: 'Priya Ceramics',
      rating: 4.8,
      reviews: 156,
      location: 'Jaipur, Rajasthan',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Wooden Coffee Table',
      price: '₹12,999',
      originalPrice: '₹15,999',
      image: 'https://fleck.co.in/cdn/shop/products/Skog_Solid_wood_coffee_table_by_Fleck.jpg?v=1745549643',
      seller: 'Craftsman Woods',
      rating: 4.9,
      reviews: 89,
      location: 'Mysore, Karnataka',
      badge: 'Premium'
    },
    {
      id: 3,
      name: 'Handwoven Silk Saree',
      price: '₹8,999',
      originalPrice: '₹11,999',
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcShiNRdh3nt_ciTcw3a6xLurfFY8farWbxvYSXho6Sa3s7G_y9fEC385YZoCu-eYcyfS3KB8ecH8gpuRKMUyiXQx17tWBb9z4p_lVSaVP4G7lXRbxceyaH8m9Cxo4-EFyD_ojlXC-0&usqp=CAc',
      seller: 'Banarasi Silks',
      rating: 4.7,
      reviews: 234,
      location: 'Varanasi, UP',
      badge: 'Traditional'
    },
    {
      id: 4,
      name: 'Silver Jewelry Set',
      price: '₹5,499',
      originalPrice: '₹7,299',
      image: 'https://namanarts.in/cdn/shop/files/NAJC_87_da395476-896f-4c3e-abce-5feeea47a05a.jpg?v=1714644750&width=1080',
      seller: 'Royal Jewelers',
      rating: 4.9,
      reviews: 167,
      location: 'Udaipur, Rajasthan',
      badge: 'Handmade'
    }
  ]

  // Categories
 const categories = [
  { 
    name: 'Pottery', 
    image: 'https://m.media-amazon.com/images/I/61hV8lwDOsL.jpg', 
    count: '2,500+ items', 
    color: 'bg-orange-100 text-orange-600' 
  },
  { 
    name: 'Textiles', 
    image: 'https://5.imimg.com/data5/QJ/PF/DV/SELLER-71011819/sofa-fabric-500x500-500x500.jpg', 
    count: '3,200+ items', 
    color: 'bg-purple-100 text-purple-600' 
  },
  { 
    name: 'Jewelry', 
    image: 'https://media.licdn.com/dms/image/v2/C5612AQGYEAGRcu0Pow/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1648716520025?e=2147483647&v=beta&t=_NV4L741vxIn6dJRpP0lE6QtjcxvXZN9NeVll4CgKUg', 
    count: '1,800+ items', 
    color: 'bg-yellow-100 text-yellow-600' 
  },
  { 
    name: 'Woodwork', 
    image: 'https://ashandcompany.co.uk/cdn/shop/files/Learn-hand-tool-woodworking-on-a-one-day-beginners-introduction-to-woodwork-course-at-Ash-and-Co.jpg?v=1737478744&width=1946', 
    count: '1,400+ items', 
    color: 'bg-green-100 text-green-600' 
  },
  { 
    name: 'Scented Candles', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtCNpCyHE1GspRlxF-VZKe6BhTaa6qIfgeHQ&s', 
    count: '980+ items', 
    color: 'bg-blue-100 text-blue-600' 
  },
  { 
    name: 'Paintings', 
    image: 'https://5.imimg.com/data5/RA/CW/JK/SELLER-79335428/all-painting-work.jpg', 
    count: '2,100+ items', 
    color: 'bg-pink-100 text-pink-600' 
  },
  { 
    name: 'Leather', 
    image: 'https://www.craftshades.com/wp-content/uploads/2017/08/IMG_20240602_133357.jpg', 
    count: '750+ items', 
    color: 'bg-amber-100 text-amber-600' 
  },
  { 
    name: 'Sculptures', 
    image: 'https://www.thisiscolossal.com/wp-content/uploads/2015/06/ghastlynights.jpg', 
    count: '650+ items', 
    color: 'bg-gray-100 text-gray-600' 
  }
]

  // Features
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Verified Artisans',
      description: 'Connect with authenticated craftspeople and traditional artisans across India'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'Safe and secure transactions with buyer protection and money-back guarantee'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Nationwide Delivery',
      description: 'Fast and reliable delivery to your doorstep with real-time tracking'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Direct Communication',
      description: 'Chat directly with artisans to customize your orders and ask questions'
    }
  ]

  // Statistics
  const stats = [
    { number: '50,000+', label: 'Happy Customers', icon: <Users className="w-6 h-6" /> },
    { number: '5,000+', label: 'Verified Artisans', icon: <Award className="w-6 h-6" /> },
    { number: '100,000+', label: 'Products Sold', icon: <Package className="w-6 h-6" /> },
    { number: '28', label: 'States Covered', icon: <Globe className="w-6 h-6" /> }
  ]

  // Testimonials
  const testimonials = [
    {
      name: 'Anjali Sharma',
      location: 'Mumbai, Maharashtra',
      text: 'The quality of handmade products here is exceptional. I found the perfect pottery set for my home, and the artisan was so helpful in customizing it to my needs.',
      rating: 5,
      image: 'https://i0.wp.com/masteringportraitphotography.com/wp-content/uploads/2018/09/140822AMAS0573-scaled.jpg?fit=862%2C1207&ssl=1'
    },
    {
      name: 'Rahul Gupta',
      location: 'Delhi, NCR',
      text: 'As a seller on Handmade Nexus, I have been able to reach customers across India. The collaboration hub helped me work with other artisans on large orders.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Meera Patel',
      location: 'Ahmedabad, Gujarat',
      text: 'I love supporting traditional crafts, and this platform makes it so easy to find authentic handmade products. The delivery is always on time!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">Handmade Nexus</h1>
                <p className="text-xs text-orange-600">Crafted with Love</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            {/* <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-orange-600 transition-colors">Features</a>
              <a href="#categories" className="text-gray-700 hover:text-orange-600 transition-colors">Categories</a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
              <a href="#testimonials" className="text-gray-700 hover:text-orange-600 transition-colors">Reviews</a>
            </nav> */}

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/user-type" 
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-700">Features</a>
              <a href="#categories" className="block py-2 text-gray-700">Categories</a>
              <a href="#about" className="block py-2 text-gray-700">About</a>
              <a href="#testimonials" className="block py-2 text-gray-700">Reviews</a>
              <div className="pt-4 border-t space-y-2">
                <Link to="/login" className="block py-2 text-gray-700">Sign In</Link>
                <Link to="/signup" className="block py-2 bg-orange-500 text-white text-center rounded-lg">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>India's Premier Handmade Marketplace</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover
                  Authentic
                  <br />
                  Handmade Treasures
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Connect directly with skilled artisans across India. Shop unique, handcrafted products or showcase your own creations to the world.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup?type=customer" 
                  className="bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-colors font-semibold text-lg flex items-center justify-center"
                >
                  Start Shopping
                  <ShoppingCart className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  to="/signup?type=seller" 
                  className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-full hover:bg-orange-50 transition-colors font-semibold text-lg flex items-center justify-center"
                >
                  Sell Your Crafts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">App Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5K+</div>
                  <div className="text-sm text-gray-600">Artisans</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://c8.alamy.com/comp/RYH1EX/lots-of-traditional-ukrainian-handmade-clay-pottery-production-RYH1EX.jpg" 
                    alt="Handmade pottery" 
                    className="rounded-2xl shadow-xl"
                  />
                  <img 
                    src="https://i.pinimg.com/736x/43/9f/69/439f69c35cc6ff9e3f1813b7ffd86c18.jpg" 
                    alt="Handmade jewelry" 
                    className="rounded-2xl shadow-xl"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="https://st.depositphotos.com/1220004/3774/i/450/depositphotos_37741921-mother-of-Pearl-Necklace-with-original-Oyster-for-sale-by-jewele.jpg" 
                    alt="Handmade textiles" 
                    className="rounded-2xl shadow-xl"
                  />
                  <img 
                    src="https://www.shutterstock.com/image-photo/baskets-woven-willow-twigs-container-600nw-565145395.jpg" 
                    alt="Handmade furniture" 
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
              
              {/* Floating badges */}
              {/* <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-bounce">
                <div className="text-orange-500 font-bold">100% Authentic</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-pulse">
                <div className="text-green-500 font-bold">✓ Verified</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-500 rounded-xl mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {/* Categories Section */}
<section id="categories" className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Discover unique handmade products across various traditional and contemporary categories
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <div key={index} className="group cursor-pointer">
          <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-xl transition-all duration-300 text-center group-hover:-translate-y-2">
            <div className="mb-4 overflow-hidden rounded-xl">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-[130px] h-[100px]  rounded-lg object-cover mx-auto group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600">{category.count}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Handpicked treasures from our talented artisans</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {product.badge}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{product.seller} • {product.location}</span>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Handmade Nexus?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just a marketplace - we're a community that celebrates traditional craftsmanship and authentic artistry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="about" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Artisan at work" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6">
                  To preserve and promote India's rich heritage of traditional crafts while empowering artisans with modern technology and global reach.
                </p>
                <p className="text-lg text-gray-700">
                  We believe every handmade product tells a story of passion, skill, and cultural heritage that deserves to be shared with the world.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-700">
                  To become the world's most trusted platform for authentic handmade products, creating sustainable livelihoods for artisans while offering customers unique, meaningful purchases.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <TrendingUp className="w-8 h-8 text-orange-500 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Growing Community</h4>
                  <p className="text-sm text-gray-600">5000+ artisans joined in 2024</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Globe className="w-8 h-8 text-orange-500 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Global Reach</h4>
                  <p className="text-sm text-gray-600">Shipping to 15+ countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Stories from customers and artisans who love Handmade Nexus</p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Join thousands of customers discovering unique handmade products, or showcase your crafts to the world as an artisan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup?type=customer" 
              className="bg-white text-orange-500 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg flex items-center justify-center"
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              Start Shopping
            </Link>
            <Link 
              to="/signup?type=seller" 
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-orange-500 transition-colors font-semibold text-lg flex items-center justify-center"
            >
              <Palette className="mr-2 w-5 h-5" />
              Become an Artisan
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Handmade Nexus</h3>
                  <p className="text-sm text-gray-400">Crafted with Love</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                India's premier marketplace for authentic handmade products, connecting artisans with customers worldwide.
              </p>
              
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">For Customers</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Orders</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wishlist</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Customer Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">For Artisans</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sell Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Seller Dashboard</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Collaboration Hub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Handmade Nexus. All rights reserved. Made with ❤️ in India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
