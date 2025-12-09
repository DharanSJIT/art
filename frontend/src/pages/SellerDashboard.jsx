import React, { useState, useEffect } from 'react'
import { User, Package, Users, Truck, Plus, Search, Star, MapPin, CreditCard, DollarSign, CheckCircle, AlertCircle, FileText, ChevronDown, TrendingUp, ShoppingBag, Clock, Edit, Trash2, Eye, Bell, Settings, BarChart3, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LoanEvaluation from './LoanEvaluation'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const SellerDashboard = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [sellerData, setSellerData] = useState({
    name: currentUser?.displayName || currentUser?.email || 'Seller',
    email: currentUser?.email || '',
    phone: '+91 9876543210',
    address: 'Chennai, Tamil Nadu',
    productType: 'Pottery',
    experience: '5+ years',
    rating: 4.7,
    totalOrders: 0,
    completedOrders: 0
  })

  useEffect(() => {
    if (currentUser) {
      setSellerData(prev => ({
        ...prev,
        name: currentUser.displayName || currentUser.email || 'Seller',
        email: currentUser.email || ''
      }))
    }
  }, [currentUser])
  const [loanData, setLoanData] = useState({
    currentLoans: [
      {
        id: 'LOAN001',
        amount: 50000,
        purpose: 'Raw Material Purchase',
        status: 'active',
        emi: 2500,
        remainingAmount: 35000,
        nextDueDate: '2024-02-15',
        interestRate: 12.5,
        tenure: '24 months'
      },
      {
        id: 'LOAN002',
        amount: 25000,
        purpose: 'Equipment Purchase',
        status: 'pending',
        emi: 0,
        remainingAmount: 25000,
        nextDueDate: null,
        interestRate: 11.0,
        tenure: '18 months'
      }
    ],
    creditScore: 720,
    eligibleAmount: 75000,
    totalDisbursed: 50000,
    totalRepaid: 15000
  })

  const [loanApplication, setLoanApplication] = useState({
    amount: '',
    purpose: '',
    tenure: '',
    businessRevenue: '',
    collateral: ''
  })
  const getLoanStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleLoanApplication = (e) => {
    e.preventDefault()
    // Handle loan application submission
    console.log('Loan application submitted:', loanApplication)
    // Reset form or show success message
  }

  const LoanTab = () => (
    <div className="space-y-6">
      {/* Loan Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Credit Score</p>
              <p className="text-2xl font-bold">{loanData.creditScore}</p>
            </div>
            <Star className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Eligible Amount</p>
              <p className="text-2xl font-bold">₹{loanData.eligibleAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Disbursed</p>
              <p className="text-2xl font-bold">₹{loanData.totalDisbursed.toLocaleString()}</p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Repaid</p>
              <p className="text-2xl font-bold">₹{loanData.totalRepaid.toLocaleString()}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Loans */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Loans</h3>
          <div className="space-y-4">
            {loanData.currentLoans.map((loan) => (
              <div key={loan.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{loan.id}</h4>
                    <p className="text-sm text-gray-600">{loan.purpose}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLoanStatusColor(loan.status)}`}>
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Loan Amount</p>
                    <p className="font-medium">₹{loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Remaining</p>
                    <p className="font-medium">₹{loan.remainingAmount.toLocaleString()}</p>
                  </div>
                  {loan.status === 'active' && (
                    <>
                      <div>
                        <p className="text-gray-500">Monthly EMI</p>
                        <p className="font-medium">₹{loan.emi.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Next Due</p>
                        <p className="font-medium">{loan.nextDueDate}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-gray-500">Interest Rate</p>
                    <p className="font-medium">{loan.interestRate}% p.a.</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tenure</p>
                    <p className="font-medium">{loan.tenure}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loan Application Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Apply for New Loan</h3>
          <form onSubmit={handleLoanApplication} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanApplication.amount}
                onChange={(e) => setLoanApplication({...loanApplication, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter loan amount"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose
              </label>
              <select
                value={loanApplication.purpose}
                onChange={(e) => setLoanApplication({...loanApplication, purpose: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select purpose</option>
                <option value="raw-materials">Raw Materials</option>
                <option value="equipment">Equipment Purchase</option>
                <option value="working-capital">Working Capital</option>
                <option value="business-expansion">Business Expansion</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Repayment Tenure
              </label>
              <select
                value={loanApplication.tenure}
                onChange={(e) => setLoanApplication({...loanApplication, tenure: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select tenure</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="18">18 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Business Revenue (₹)
              </label>
              <input
                type="number"
                value={loanApplication.businessRevenue}
                onChange={(e) => setLoanApplication({...loanApplication, businessRevenue: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter monthly revenue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collateral (Optional)
              </label>
              <textarea
                value={loanApplication.collateral}
                onChange={(e) => setLoanApplication({...loanApplication, collateral: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="3"
                placeholder="Describe any collateral you can offer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors font-medium"
            >
              Submit Application
            </button>
          </form>

          {/* Loan Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Loan Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Maintain regular order completion for better credit score</li>
              <li>• Upload business documents for faster approval</li>
              <li>• Consider collateral for lower interest rates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Loan History/Eligibility Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Eligibility & Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Eligibility Criteria</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Active seller for 6+ months</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Minimum 4.0 rating</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Regular order completion</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                <span>Valid business documents</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Required Documents</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-500 mr-2" />
                <span>PAN Card & Aadhaar Card</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-500 mr-2" />
                <span>Bank statements (6 months)</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-500 mr-2" />
                <span>Business registration certificate</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-500 mr-2" />
                <span>GST registration (if applicable)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customerName: 'Alice Johnson',
      product: 'Ceramic Vase Set',
      quantity: 2,
      amount: 89.98,
      status: 'pending',
      orderDate: '2024-01-15',
      deliveryAddress: 'Bangalore, Karnataka'
    },
    {
      id: 'ORD002',
      customerName: 'Bob Smith',
      product: 'Handmade Pottery Bowls',
      quantity: 4,
      amount: 156.00,
      status: 'completed',
      orderDate: '2024-01-12',
      deliveryAddress: 'Mumbai, Maharashtra'
    }
  ])

  const [collaborators, setCollaborators] = useState([
    {
      id: 1,
      name: 'Sarah Wilson',
      skill: 'Painter',
      rating: 4.8,
      location: 'Chennai, TN',
      experience: '3+ years',
      image: 'https://via.placeholder.com/100x100?text=SW'
    },
    {
      id: 2,
      name: 'Mike Chen',
      skill: 'Wood Carver',
      rating: 4.9,
      location: 'Bangalore, KA',
      experience: '7+ years',
      image: 'https://via.placeholder.com/100x100?text=MC'
    }
  ])

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Clay & More Supplies',
      materials: ['Premium Clay', 'Glazes', 'Tools'],
      location: 'Chennai, Tamil Nadu',
      rating: 4.6,
      minOrder: 1000,
      contact: '+91 9876543210'
    },
    {
      id: 2,
      name: 'Artisan Raw Materials',
      materials: ['Wood', 'Paints', 'Brushes'],
      location: 'Bangalore, Karnataka',
      rating: 4.8,
      minOrder: 500,
      contact: '+91 9876543211'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const handleLogout = async () => {
    await logout()
    navigate('/seller/login')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const ProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-orange-50 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
            <div className="flex items-end space-x-5">
              <div className="w-32 h-32 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
                <User className="w-16 h-16 text-orange-600" />
              </div>
              <div className="pb-2">
                <h2 className="text-3xl font-bold text-gray-900">{sellerData.name}</h2>
                <p className="text-gray-600 mt-1">{sellerData.productType} Specialist</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700 ml-1">{sellerData.rating}/5</span>
                  </div>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{sellerData.totalOrders} orders</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{sellerData.experience}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Business Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-500">Email Address</label>
            <p className="text-gray-900 text-lg">{sellerData.email}</p>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-500">Phone Number</label>
            <p className="text-gray-900 text-lg">{sellerData.phone}</p>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-500">Business Address</label>
            <p className="text-gray-900 text-lg">{sellerData.address}</p>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-500">Specialization</label>
            <p className="text-gray-900 text-lg">{sellerData.productType}</p>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-500">Experience</label>
            <p className="text-gray-900 text-lg">{sellerData.experience}</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-500">Total Orders</h4>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{sellerData.totalOrders}</p>
          <p className="text-sm text-gray-500 mt-2">All time orders</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-500">Completed</h4>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{sellerData.completedOrders}</p>
          <p className="text-sm text-gray-500 mt-2">Successfully delivered</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-500">Success Rate</h4>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-4xl font-bold text-gray-900">{Math.round((sellerData.completedOrders / sellerData.totalOrders) * 100) || 0}%</p>
          <p className="text-sm text-gray-500 mt-2">Order completion rate</p>
        </div>
      </div>
    </div>
  )
  const Loan = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{sellerData.name}</h2>
            <p className="text-gray-600">{sellerData.productType} Specialist</p>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">{sellerData.rating}/5</span>
              <span className="text-sm text-gray-400 ml-2">({sellerData.totalOrders} orders)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-600">{sellerData.totalOrders}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900">Completed</h3>
            <p className="text-2xl font-bold text-green-600">{sellerData.completedOrders}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900">Success Rate</h3>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round((sellerData.completedOrders / sellerData.totalOrders) * 100)}%
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{sellerData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <p className="text-gray-900">{sellerData.phone}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <p className="text-gray-900">{sellerData.address}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Specialization</label>
              <p className="text-gray-900">{sellerData.productType}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <p className="text-gray-900">{sellerData.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const OrdersTab = () => (
    <div className="space-y-6">
      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-2">Completed</p>
          <p className="text-3xl font-bold text-green-600">{orders.filter(o => o.status === 'completed').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-2">Revenue</p>
          <p className="text-3xl font-bold text-orange-600">₹{orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.deliveryAddress}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.product}</div>
                    <div className="text-xs text-gray-500">Qty: {order.quantity}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.orderDate}</td>
                  <td className="px-6 py-4">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const CollaborationTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Find Collaborators</h2>
            <p className="text-sm text-gray-500 mt-1">Connect with skilled artisans</p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Search by skill..." className="pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full md:w-80" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborators.filter(collab => collab.skill.toLowerCase().includes(searchTerm.toLowerCase())).map((collaborator) => (
            <div key={collaborator.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-orange-300">
              <div className="flex items-center space-x-4 mb-4">
                <img src={collaborator.image} alt={collaborator.name} className="w-16 h-16 rounded-full border-2 border-orange-200" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{collaborator.name}</h3>
                  <p className="text-sm text-orange-600 font-medium">{collaborator.skill}</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {collaborator.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                  {collaborator.rating}/5 Rating
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {collaborator.experience}
                </div>
              </div>
              <button className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                Connect Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const SupplyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Raw Material Suppliers</h2>
            <p className="text-sm text-gray-500 mt-1">Find quality materials for your craft</p>
          </div>
          <button className="flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
            <Plus className="w-5 h-5 mr-2" />
            Request Quote
          </button>
        </div>

        <div className="space-y-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-orange-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-xl mb-2">{supplier.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      {supplier.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                      {supplier.rating}/5 Rating
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold whitespace-nowrap">
                  Contact Supplier
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-3">Available Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {supplier.materials.map((material, index) => (
                    <span key={index} className="px-4 py-2 bg-orange-50 text-orange-700 text-sm rounded-lg font-medium border border-orange-200">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Min Order:</span>
                  <span className="font-bold text-gray-900 ml-2">₹{supplier.minOrder}</span>
                </div>
                <div>
                  <span className="text-gray-500">Contact:</span>
                  <span className="font-bold text-gray-900 ml-2">{supplier.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const [myProducts, setMyProducts] = useState([]);

  const ProductsTab = () => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
      name: '',
      price: '',
      originalPrice: '',
      image: '',
      category: '',
      description: '',
      stockCount: '',
      deliveryTime: ''
    });

    useEffect(() => {
      fetchMyProducts();
    }, []);

    const fetchMyProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products`);
        const data = await response.json();
        if (data.success) {
          const sellerProducts = data.data.products.filter(p => p.seller?.id === currentUser?.uid || p.seller?.name === sellerData.name);
          setMyProducts(sellerProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    const handleProductSubmit = async (e) => {
      e.preventDefault();
      const stockCount = parseInt(productForm.stockCount);
      if (stockCount <= 0) {
        toast.error('Stock count must be greater than 0');
        return;
      }

      try {
        const url = editingProduct 
          ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products/${editingProduct._id}`
          : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products`;
        
        const response = await fetch(url, {
          method: editingProduct ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...productForm,
            price: parseFloat(productForm.price),
            originalPrice: parseFloat(productForm.originalPrice),
            stockCount: stockCount,
            seller: {
              id: currentUser?.uid,
              name: sellerData.name,
              location: sellerData.address,
              rating: sellerData.rating,
              verified: true
            },
            rating: editingProduct?.rating || 4.5,
            reviewCount: editingProduct?.reviewCount || 0,
            inStock: stockCount > 0,
            isPopular: editingProduct?.isPopular || false,
            isFeatured: editingProduct?.isFeatured || false,
            discount: Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100),
            tags: [productForm.category],
            shippingCost: 0,
            freeShipping: true
          })
        });
        const data = await response.json();
        if (data.success) {
          toast.success(editingProduct ? 'Product updated!' : 'Product uploaded!');
          setProductForm({ name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: '' });
          setEditingProduct(null);
          fetchMyProducts();
        }
      } catch (error) {
        toast.error('Failed to save product');
      }
    };

    const handleEdit = (product) => {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        description: product.description,
        stockCount: product.stockCount,
        deliveryTime: product.deliveryTime
      });
    };

    const handleDelete = async (productId) => {
      if (!confirm('Are you sure you want to delete this product?')) return;
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products/${productId}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          toast.success('Product deleted!');
          fetchMyProducts();
        }
      } catch (error) {
        toast.error('Failed to delete product');
      }
    };

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Products</p>
                <h3 className="text-3xl font-bold text-gray-900">{myProducts.length}</h3>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                <Package className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">In Stock</p>
                <h3 className="text-3xl font-bold text-green-600">{myProducts.filter(p => p.stockCount > 0).length}</h3>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
                <h3 className="text-3xl font-bold text-red-600">{myProducts.filter(p => p.stockCount === 0).length}</h3>
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            {editingProduct && (
              <button onClick={() => { setEditingProduct(null); setProductForm({ name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: '' }); }} className="text-sm text-gray-600 hover:text-gray-900">
                Cancel Editing
              </button>
            )}
          </div>
          <form onSubmit={handleProductSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} placeholder="Enter product name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}>
                  <option value="">Select category</option>
                  <option value="pottery">Pottery</option>
                  <option value="woodwork">Woodwork</option>
                  <option value="textiles">Textiles</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="metalwork">Metalwork</option>
                  <option value="leather">Leather</option>
                  <option value="painting">Painting</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                <input type="number" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price (₹)</label>
                <input type="number" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.originalPrice} onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})} placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Count</label>
                <input type="number" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.stockCount} onChange={(e) => setProductForm({...productForm, stockCount: e.target.value})} placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Time</label>
                <input type="text" required placeholder="e.g., 5-7 days" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.deliveryTime} onChange={(e) => setProductForm({...productForm, deliveryTime: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input type="url" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.image} onChange={(e) => setProductForm({...productForm, image: e.target.value})} placeholder="https://example.com/image.jpg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea required rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} placeholder="Describe your product..." />
            </div>
            <button type="submit" className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg hover:bg-orange-700 font-semibold text-lg transition-colors">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Products</h2>
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search products..." className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            </div>
          </div>
          {myProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No products yet. Add your first product above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProducts.map((product) => (
                <div key={product._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${product.stockCount > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-2xl font-bold text-orange-600">₹{product.price}</p>
                        <p className="text-sm text-gray-400 line-through">₹{product.originalPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Stock</p>
                        <p className="text-lg font-bold text-gray-900">{product.stockCount}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(product)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

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
      {/* Modern Header */}
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
        {/* Dashboard Overview - Only show on profile tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{myProducts.length}</h3>
              <p className="text-sm text-gray-500 mt-1">Total Products</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{sellerData.totalOrders}</h3>
              <p className="text-sm text-gray-500 mt-1">Total Orders</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+23%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">₹{(myProducts.reduce((sum, p) => sum + (p.price * p.stockCount), 0)).toLocaleString()}</h3>
              <p className="text-sm text-gray-500 mt-1">Inventory Value</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{sellerData.rating}</h3>
              <p className="text-sm text-gray-500 mt-1">Seller Rating</p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Modern Sidebar */}
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

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'products' && <ProductsTab />}
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
