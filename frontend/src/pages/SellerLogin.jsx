import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { db, auth } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import sidebarImage from '../assets/seller_login.png'

const SellerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      
      // Check if user is a seller
      const sellerDoc = await getDoc(doc(db, 'sellers', result.user.uid))
      
      if (!sellerDoc.exists()) {
        toast.error('This account is not registered as a seller. Please use customer login.')
        await auth.signOut()
        return
      }
      
      navigate('/seller/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      toast.error('Failed to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

const [showPassword, setShowPassword] = useState(false);

const togglePassword = () => {
  setShowPassword((prev) => !prev);
};


  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-full h-screen flex">
        {/* LEFT SIDE: Image Section */}
        <div className="relative w-1/2 hidden lg:block">
          <img 
            src={sidebarImage} 
            alt="Seller Handshake" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay to make text readable and blend with theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-primary-600/40 mix-blend-multiply"></div>
          
          {/* Welcome Text over image */}
          <div className="absolute inset-0 flex items-center justify-center p-12 text-white text-center z-10">
            <div className="max-w-lg">
                <h2 className="text-4xl font-bold mb-4">Welcome Seller</h2>
                <p className="text-lg text-primary-100 mb-6">Sign in to access your dashboard, manage products, and track your success.</p>
                <p className="text-base text-primary-50 leading-relaxed">Manage your product inventory and pricing. Connect with buyers and other sellers. Track orders and grow your business.</p>
            </div>
          </div>
        </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 md:p-8">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Back Button */}
          <div className="lg:hidden mb-8">
            <Link
              to="/user-type"
              className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium group"
            >
              <span className="mr-2">←</span>
              Back to user selection
            </Link>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-10">
            <div className="flex items-center space-x-4 mb-6">
              <img src="/src/assets/logo.png" alt="Handmade Nexus" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Handmade Nexus
                </h1>
                <p className="text-gray-600 text-sm">Seller Portal</p>
              </div>
            </div>
          </div>

          {/* Friendly greeting */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl text-2xl font-semibold text-gray-900 mb-3 text-center">
              Seller Login
            </h2>
            <p className="text-gray-600 mb-4">
              Access your dashboard to manage products and orders
            </p>
          </div>

          {/* The form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 group-focus-within:text-amber-500 transition-colors">
                    @
                  </span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-gray-400"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 group-focus-within:text-amber-500 transition-colors">
                    🔒
                  </span>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all hover:border-gray-400"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <span className="text-gray-400 hover:text-gray-600 transition-colors">
                      👁️
                    </span>
                  ) : (
                    <span className="text-gray-400 hover:text-gray-600 transition-colors">
                      👁️🗨️
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  New seller?
                </span>
              </div>
            </div>

            {/* Register link */}
            <div className="mt-6">
              <Link
                to="/seller/register"
                className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all hover:border-gray-400"
              >
                Register as a seller
              </Link>
            </div>
          </div>

          {/* Small human touch */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-xs text-gray-400">
              <span className="mr-2">Handcrafted with care</span>
              <div className="flex">
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "0ms" }}
                >
                  ♥
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "150ms" }}
                >
                  ♥
                </span>
                <span
                  className="animate-bounce"
                  style={{ animationDelay: "300ms" }}
                >
                  ♥
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SellerLogin