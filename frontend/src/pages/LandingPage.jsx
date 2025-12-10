// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, ShoppingCart, User, Star, MapPin, Truck, Shield, 
  Heart, ArrowRight, CheckCircle, Users, Package, Globe,
  Palette, Menu, X, Award, TrendingUp, Clock, MessageCircle,
  Home, ShoppingBag, Users as UsersIcon, Phone, Mail, Instagram,
  Facebook, Twitter, Award as AwardIcon, BadgeCheck
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
      // price: '₹2,499',
      // originalPrice: '₹3,299',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNt53IOPLYJfPYa91y_n3lJjO54aqzSPMyxQ&s',
      // seller: 'priya1,priya2,rashmi Ceramics',
      // rating: 4.8,
      // reviews: 156,
      // location: 'Jaipur, Rajasthan',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Wooden Coffee Table',
      image: 'https://fleck.co.in/cdn/shop/products/Skog_Solid_wood_coffee_table_by_Fleck.jpg?v=1745549643',
      badge: 'Premium'
    },
    {
      id: 3,
      name: 'Handwoven Silk Saree',
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcShiNRdh3nt_ciTcw3a6xLurfFY8farWbxvYSXho6Sa3s7G_y9fEC385YZoCu-eYcyfS3KB8ecH8gpuRKMUyiXQx17tWBb9z4p_lVSaVP4G7lXRbxceyaH8m9Cxo4-EFyD_ojlXC-0&usqp=CAc',
      badge: 'Traditional'
    },
    {
      id: 4,
      name: 'Silver Jewelry Set',
      image: 'https://m.media-amazon.com/images/I/91Dmt+DXl7L._AC_UY1100_.jpg',
      badge: 'Handmade'
    }
  ]

  // Categories
  const categories = [
    { 
      name: 'Pottery', 
      image: 'https://m.media-amazon.com/images/I/61hV8lwDOsL.jpg', 
      count: '2,500+ items',
      icon: '🏺'
    },
    { 
      name: 'Textiles', 
      image: 'https://5.imimg.com/data5/QJ/PF/DV/SELLER-71011819/sofa-fabric-500x500-500x500.jpg', 
      count: '3,200+ items',
      icon: '🧵'
    },
    { 
      name: 'Jewelry', 
      image: 'https://media.licdn.com/dms/image/v2/C5612AQGYEAGRcu0Pow/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1648716520025?e=2147483647&v=beta&t=_NV4L741vxIn6dJRpP0lE6QtjcxvXZN9NeVll4CgKUg', 
      count: '1,800+ items',
      icon: '💎'
    },
    { 
      name: 'Woodwork', 
      image: 'https://ashandcompany.co.uk/cdn/shop/files/Learn-hand-tool-woodworking-on-a-one-day-beginners-introduction-to-woodwork-course-at-Ash-and-Co.jpg?v=1737478744&width=1946', 
      count: '1,400+ items',
      icon: '🪵'
    },
    { 
      name: 'Scented Candles', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtCNpCyHE1GspRlxF-VZKe6BhTaa6qIfgeHQ&s', 
      count: '980+ items',
      icon: '🕯️'
    },
    { 
      name: 'Paintings', 
      image: 'https://5.imimg.com/data5/RA/CW/JK/SELLER-79335428/all-painting-work.jpg', 
      count: '2,100+ items',
      icon: '🎨'
    },
    { 
      name: 'Leather', 
      image: 'https://www.craftshades.com/wp-content/uploads/2017/08/IMG_20240602_133357.jpg', 
      count: '750+ items',
      icon: '👜'
    },
    { 
      name: 'Sculptures', 
      image: 'https://www.thisiscolossal.com/wp-content/uploads/2015/06/ghastlynights.jpg', 
      count: '650+ items',
      icon: '🗿'
    }
  ]

  // Features
  const features = [
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: 'Verified Artisans',
      description: 'Every artisan is thoroughly verified to ensure authenticity and quality craftsmanship.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Payments',
      description: 'Your transactions are protected with bank-level security and buyer guarantees.'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Careful Delivery',
      description: 'Each item is packaged with care and tracked until it reaches your doorstep.'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Direct Connection',
      description: 'Chat directly with artisans to understand their craft and request customizations.'
    }
  ]

  // Statistics
  const stats = [
    { number: '50,000+', label: 'Happy Customers', description: 'Trusting us with their handmade finds' },
    { number: '5,000+', label: 'Skilled Artisans', description: 'Preserving traditional crafts' },
    { number: '100,000+', label: 'Products Sold', description: 'Each with a unique story' },
    { number: '28 States', label: 'Across India', description: 'Representing diverse cultures' }
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
      text: 'As a seller on Handmade Nexus, I have been able to reach customers across India. The platform has helped me sustain my family business while preserving our craft.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Meera Patel',
      location: 'Ahmedabad, Gujarat',
      text: 'I love supporting traditional crafts, and this platform makes it so easy to find authentic handmade products. The delivery is always careful and on time!',
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
            <img src="/src/assets/logo.png" alt="Handmade Nexus" className="h-12 w-auto" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Handmade Nexus
              </h1>
              <p className="text-xs text-orange-600">Crafted with Love</p>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/explore"
              className="bg-white-300 text-primary px-4 sm:px-6 py-2 rounded-full hover:bg-orange-300 transition-colors font-medium"
            >
              Explore
            </Link>
            <Link
              to="/user-type"
              className="bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-orange-600 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <a href="#features" className="block py-2 text-gray-700">
              Features
            </a>
            <a href="#categories" className="block py-2 text-gray-700">
              Categories
            </a>
            <a href="#about" className="block py-2 text-gray-700">
              About
            </a>
            <a href="#testimonials" className="block py-2 text-gray-700">
              Reviews
            </a>
            <div className="pt-4 border-t space-y-2">
              <Link to="/login" className="block py-2 text-gray-700">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block py-2 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>


      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg text-sm font-medium border border-amber-200">
                  <AwardIcon className="w-4 h-4" />
                  <span>India's Trusted Handmade Marketplace</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Discover the human touch
                  <br />
                  in every handmade piece
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                  Each product tells a story of skill, tradition, and passion. Connect directly with artisans who pour their heart into their craft.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup?type=customer" 
                  className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium text-base flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Start Shopping
                </Link>
                <Link 
                  to="/signup?type=seller" 
                  className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors font-medium text-base flex items-center justify-center"
                >
                  <UsersIcon className="mr-2 w-5 h-5" />
                  Join as Artisan
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 flex items-center">
                    4.9 <Star className="w-4 h-4 text-amber-500 fill-current ml-1" />
                  </div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Satisfied Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">5K+</div>
                  <div className="text-sm text-gray-600">Talented Artisans</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://c8.alamy.com/comp/RYH1EX/lots-of-traditional-ukrainian-handmade-clay-pottery-production-RYH1EX.jpg" 
                    alt="Handmade pottery" 
                    className="rounded-lg shadow-md object-cover h-48 w-full"
                  />
                  <img 
                    src="https://i.pinimg.com/736x/43/9f/69/439f69c35cc6ff9e3f1813b7ffd86c18.jpg" 
                    alt="Handmade jewelry" 
                    className="rounded-lg shadow-md object-cover h-48 w-full"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="https://st.depositphotos.com/1220004/3774/i/450/depositphotos_37741921-mother-of-Pearl-Necklace-with-original-Oyster-for-sale-by-jewele.jpg" 
                    alt="Handmade textiles" 
                    className="rounded-lg shadow-md object-cover h-48 w-full"
                  />
                  <img 
                    src="https://www.shutterstock.com/image-photo/baskets-woven-willow-twigs-container-600nw-565145395.jpg" 
                    alt="Handmade furniture" 
                    className="rounded-lg shadow-md object-cover h-48 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Community in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real people, real stories, real impact on traditional crafts
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-base font-medium text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Craft</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover unique handmade products across various traditional and contemporary crafts
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-lg p-4 border hover:shadow-md transition-all duration-300">
                  <div className="mb-3 overflow-hidden rounded-md">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">{category.icon}</span>
                    <h3 className="text-base font-medium text-gray-900">{category.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Curated Collections</h2>
            <p className="text-gray-600">Handpicked treasures from our talented artisans</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg border overflow-hidden group hover:shadow-md transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {product.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    
                  </div>
                  
                  
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Handmade Nexus?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're a community that celebrates traditional craftsmanship and authentic artistry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="about" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Artisan at work" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Purpose</h2>
                <p className="text-gray-600 mb-4">
                  We believe that behind every handmade product is a story—a story of skill, tradition, and human connection. 
                  Our mission is to preserve these stories while helping artisans build sustainable livelihoods.
                </p>
                <p className="text-gray-600">
                  In a world of mass production, we champion the value of handcrafted goods that carry the unique touch 
                  of their makers.
                </p>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Commitment</h3>
                <p className="text-gray-600">
                  To create meaningful connections between artisans and customers who appreciate the time, 
                  effort, and soul poured into every handmade piece.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <TrendingUp className="w-6 h-6 text-amber-600 mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">Growing Together</h4>
                  <p className="text-sm text-gray-600">5000+ artisans joined our community</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <Globe className="w-6 h-6 text-amber-600 mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">Global Stories</h4>
                  <p className="text-sm text-gray-600">Shipping to 15+ countries worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-gray-600 mb-8">
              Join a community that values craftsmanship, authenticity, and human connection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                Shop Handmade
              </Link>
              <Link 
                to="/user-type" 
                className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors font-medium flex items-center justify-center"
              >
                <Palette className="mr-2 w-5 h-5" />
                Share Your Craft
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img src="/src/assets/logo.png" alt="Handmade Nexus" className="h-10 w-auto" />
                <div>
                  <h3 className="text-lg font-bold">Handmade Nexus</h3>
                  <p className="text-sm text-gray-400">Authentic Crafts, Real Stories</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Connecting artisans with customers who appreciate the human touch in every handmade piece.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4">For Customers</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Browse Collections</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Order Tracking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Saved Items</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4">For Artisans</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Start Selling</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Artisan Dashboard</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Community Forum</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Craft Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Our Story</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 Handmade Nexus. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Contact Us</a>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Made with care in India 🇮🇳
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage