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

  return (
    // Main Container with a slightly darker background for contrast
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
      
      {/* Back Button - Fixed position outside form */}
      <button
        onClick={() => navigate('/user-type')}
        className="absolute top-[5vh] text-xl left-[5vw] flex items-center text-primary-500 hover:text-primary-600 hover:transition-colors hover:underline z-50  p-4 rounded-full"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to user
      </button>
      
      {/* Login Card Container - Centered, rounded, shadowed, overflow hidden for image */}
      <div className="bg-white w-[70vw] h-[70vh] shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE: Image Section */}
        {/* Hidden on small screens, 50% width on medium+ screens */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto hidden md:block">
          <img 
            src={sidebarImage} 
            alt="Seller Handshake" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay to make text readable and blend with theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-primary-600/40 mix-blend-multiply"></div>
          
          {/* Welcome Text over image */}
          <div className="absolute inset-0 flex items-center justify-center p-12 text-white text-center z-10">
            <div>
                <h2 className="text-3xl font-bold mb-4">Welcome Seller</h2>
                <p className="text-primary-100">Sign in to access your dashboard, manage products, and track your success.</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">Seller Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input Field with Icon */}
            <div className="relative">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
            </div>

            {/* Password Input Field with Icon */}
            <div className="relative">
                 <label htmlFor="password" className="sr-only">Password</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Signing in...' : 'LOGIN'}
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link to="/seller/register" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-all">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SellerLogin