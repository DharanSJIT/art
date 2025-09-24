import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Store } from 'lucide-react'

const UserTypePage = () => {
  const navigate = useNavigate()

  const handleUserTypeSelection = (type) => {
    if (type === 'customer') {
      navigate('/customer/dashboard')
    } else if (type === 'seller') {
      navigate('/seller/register')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
          Welcome to Handmade Nexus!
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          Choose your role to get started
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Option */}
          <div 
            onClick={() => handleUserTypeSelection('customer')}
            className="bg-white rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary-500"
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer</h3>
              <p className="text-gray-600 mb-6">
                Browse and purchase unique handmade products from skilled artisans
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>✓ Discover unique handmade items</p>
                <p>✓ Direct communication with sellers</p>
                <p>✓ Track orders and delivery</p>
                <p>✓ Review and rate products</p>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Continue as Customer
              </button>
            </div>
          </div>

          {/* Seller Option */}
          <div 
            onClick={() => handleUserTypeSelection('seller')}
            className="bg-white rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary-500"
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Store className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Seller</h3>
              <p className="text-gray-600 mb-6">
                Sell your handmade creations and connect with customers worldwide
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>✓ Showcase your products</p>
                <p>✓ Collaborate with other artisans</p>
                <p>✓ Access to suppliers</p>
                <p>✓ Manage orders efficiently</p>
              </div>
              <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                Continue as Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserTypePage
