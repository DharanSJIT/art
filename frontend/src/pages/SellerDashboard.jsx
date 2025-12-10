import React, { useState, useEffect } from 'react'
import { User, Package, Users, Truck, CreditCard, ChevronDown, Bell, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ProfileTab from '../components/seller/ProfileTab'
import ProductsTab from '../components/seller/ProductsTab'
import OrdersTab from '../components/seller/OrdersTab'
import CollaborationTab from '../components/seller/CollaborationTab'
import SupplyTab from '../components/seller/SupplyTab'
import LoanTab from '../components/seller/LoanTab'
import LoanEvaluation from './LoanEvaluation'

const SellerDashboard = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [sellerData, setSellerData] = useState({
    name: currentUser?.displayName || currentUser?.email || 'Seller',
    email: currentUser?.email || '',
    phone: '',
    alternatePhoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    age: '',
    productType: '',
    experience: '',
    rating: 4.7,
    totalOrders: 0,
    completedOrders: 0
  })

  useEffect(() => {
    const fetchSellerData = async () => {
      if (currentUser) {
        try {
          const { doc, getDoc } = await import('firebase/firestore')
          const { db } = await import('../firebase')
          const sellerDoc = await getDoc(doc(db, 'sellers', currentUser.uid))
          if (sellerDoc.exists()) {
            const data = sellerDoc.data()
            setSellerData({
              name: data.name || currentUser.displayName || currentUser.email || 'Seller',
              email: data.email || currentUser.email || '',
              phone: data.phoneNumber || '',
              alternatePhoneNumber: data.alternatePhoneNumber || '',
              address: data.address || '',
              city: data.city || '',
              state: data.state || '',
              pincode: data.pincode || '',
              age: data.age || '',
              productType: data.productType || '',
              experience: data.experience || '',
              rating: 4.7,
              totalOrders: 0,
              completedOrders: 0
            })
          }
        } catch (error) {
          console.error('Failed to fetch seller data:', error)
        }
      }
    }
    fetchSellerData()
  }, [currentUser])

  const handleLogout = async () => {
    await logout()
    navigate('/seller/login')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'collaboration', label: 'Collaboration Hub', icon: Users },
    { id: 'supply', label: 'Supply', icon: Truck },
    { id: 'loan', label: 'Loans', icon: CreditCard },
    { id: 'loaneval', label: 'Loans Evaluation', icon: CreditCard }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img src="/src/assets/logo.png" alt="Handmade Nexus" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Seller Dashboard</h1>
                <p className="text-xs text-gray-500">Manage your business</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-gray-900">{currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Seller'}</p>
                    <p className="text-xs text-gray-500">Seller Account</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
                </button>
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{currentUser?.displayName || 'Seller'}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors font-medium mt-1">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-72">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-orange-50 text-orange-600 font-semibold border-l-4 border-orange-600'
                          : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === 'profile' && <ProfileTab sellerData={sellerData} />}
            {activeTab === 'products' && <ProductsTab currentUser={currentUser} sellerData={sellerData} />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'collaboration' && <CollaborationTab />}
            {activeTab === 'supply' && <SupplyTab />}
            {activeTab === 'loan' && <LoanTab />}
            {activeTab === 'loaneval' && <LoanEvaluation />}
          </div>
        </div>
      </div>

      {showUserDropdown && <div className="fixed inset-0 z-30" onClick={() => setShowUserDropdown(false)} />}
    </div>
  )
}

export default SellerDashboard
