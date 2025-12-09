// src/pages/LoginPage.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate('/customer/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || 'Hmm, that didn\'t work. Let\'s try that again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex font-sans">
      {/* Left side - Background Image with Overlay */}
      <div 
        className="hidden lg:block lg:w-1/2 relative overflow-hidden opacity-80"
        style={{
          backgroundImage: `url('/src/assets/image.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-lg text-white">
              {/* Handwritten style header */}
              <div className="mb-10">
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-white text-xl">✋</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Handmade Nexus</h1>
                    <p className="text-white/80 italic">where crafts find their people</p>
                  </div>
                </div>

                <h2 className="text-3xl font-normal mb-4 leading-relaxed">
                  Hello again, craft lover
                </h2>
                <p className="text-white/90 mb-8 text-lg leading-relaxed">
                  We've been waiting for you. The community's been sharing some beautiful work lately.
                </p>
              </div>

              {/* Personal touches */}
              <div className="space-y-6 mb-10">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                  <p className="font-medium mb-1 text-white">Your saved artisans miss you</p>
                  <p className="text-white/80 text-sm">3 of them added new pieces this week</p> 
                </div>

                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                  <p className="font-medium mb-1 text-white">Community update</p>
                  <p className="text-white/80 text-sm">Raj from Jaipur just finished a custom order like yours</p>
                </div>
              </div>

              {/* Quirky note */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-center">
                  <p className="italic mb-2 text-white/90">
                    "Made myself a cup of chai while waiting for you. The pot is handmade too, of course."
                  </p>
                  <p className="text-sm text-white/70">— Priya, Community Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 md:p-8">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Back Button */}
          <div className="lg:hidden mb-8">
            <Link 
              to="/"
              className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium group"
            >
              <span className="mr-2">←</span>
              Back to the marketplace
            </Link>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-amber-600 text-lg">✋</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Handmade Nexus</h1>
                <p className="text-gray-600 text-sm">Nice to see you again</p>
              </div>
            </div>
            <p className="text-gray-700">
              Come on in, we saved your favorite spot.
            </p>
          </div>

          {/* Friendly greeting */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-900 mb-3">
              Welcome back
            </h2>
            <p className="text-gray-600">
              Ready to dive back into beautiful handmade things?
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-red-500 mt-0.5">✗</div>
                <div>
                  <p className="text-red-800">{error}</p>
                  <p className="text-red-600 text-sm mt-1">Check your details and try again?</p>
                </div>
              </div>
            </div>
          )}

          {/* The form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 group-focus-within:text-amber-500 transition-colors">@</span>
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Your secret password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Forgot it?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 group-focus-within:text-amber-500 transition-colors">🔒</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
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
                    <span className="text-gray-400 hover:text-gray-600 transition-colors">👁️</span>
                  ) : (
                    <span className="text-gray-400 hover:text-gray-600 transition-colors">👁️‍🗨️</span>
                  )}
                </button>
              </div>
              
            </div>

            {/* Remember me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                Remember me on this device
                <span className="text-gray-500 text-xs block">So you don't have to type this again next time</span>
              </label>
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
                  Getting things ready...
                </>
              ) : (
                'Sign in'
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
                <span className="px-4 bg-white text-gray-500">New around here?</span>
              </div>
            </div>

            {/* Join link */}
            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all hover:border-gray-400"
              >
                {/* <span className="mr-2">✨</span> */}
                Join our craft community
              </Link>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              Every login supports an artisan somewhere in India. 
              {/* <Link to="/how-we-help" className="text-amber-600 hover:text-amber-700 ml-1 transition-colors">
                See how
              </Link> */}
            </p>
            
          </div>

          {/* Small human touch */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-xs text-gray-400">
              <span className="mr-2">Handcrafted with care</span>
              <div className="flex">
                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>♥</span>
                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>♥</span>
                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>♥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage