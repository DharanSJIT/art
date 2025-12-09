import React, { useState, useEffect } from 'react'
import { User, Package, Users, Truck, Plus, Search, Star, MapPin, CreditCard, DollarSign,CheckCircle,AlertCircle,FileText } from 'lucide-react'
import LoanEvaluation from './LoanEvaluation'
import { useAuth } from '../contexts/AuthContext'

const SellerDashboard = () => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
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
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.deliveryAddress}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.product}</div>
                    <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.orderDate}
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
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Find Collaborators</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by skill..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborators
            .filter(collab => collab.skill.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((collaborator) => (
            <div key={collaborator.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={collaborator.image}
                  alt={collaborator.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{collaborator.name}</h3>
                  <p className="text-sm text-primary-600">{collaborator.skill}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {collaborator.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  {collaborator.rating}/5
                </div>
                <div>Experience: {collaborator.experience}</div>
              </div>
              
              <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const SupplyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Raw Material Suppliers</h2>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Request Quote
          </button>
        </div>

        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{supplier.name}</h3>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{supplier.location}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm text-gray-600">{supplier.rating}/5</span>
                  </div>
                </div>
                <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
                  Contact
                </button>
              </div>
              
              <div className="mb-3">
                <h4 className="font-medium text-gray-700 mb-2">Available Materials:</h4>
                <div className="flex flex-wrap gap-2">
                  {supplier.materials.map((material, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Min Order: ₹{supplier.minOrder}</span>
                <span>Phone: {supplier.contact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const ProductsTab = () => {
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

    const handleProductSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...productForm,
            price: parseFloat(productForm.price),
            originalPrice: parseFloat(productForm.originalPrice),
            stockCount: parseInt(productForm.stockCount),
            seller: {
              id: 'seller1',
              name: sellerData.name,
              location: sellerData.address,
              rating: sellerData.rating,
              verified: true
            },
            rating: 4.5,
            reviewCount: 0,
            inStock: true,
            isPopular: false,
            isFeatured: false,
            discount: Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100),
            tags: [productForm.category],
            shippingCost: 0,
            freeShipping: true
          })
        });
        const data = await response.json();
        if (data.success) {
          alert('Product uploaded successfully!');
          setProductForm({ name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: '' });
        }
      } catch (error) {
        alert('Failed to upload product');
      }
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload New Product</h2>
        <form onSubmit={handleProductSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select required className="w-full px-3 py-2 border border-gray-300 rounded-md" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input type="number" required className="w-full px-3 py-2 border border-gray-300 rounded-md" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
              <input type="number" required className="w-full px-3 py-2 border border-gray-300 rounded-md" value={productForm.originalPrice} onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Count</label>
              <input type="number" required className="w-full px-3 py-2 border border-gray-300 rounded-md" value={productForm.stockCount} onChange={(e) => setProductForm({...productForm, stockCount: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
              <input type="text" required placeholder="e.g., 5-7 days" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={productForm.deliveryTime} onChange={(e) => setProductForm({...productForm, deliveryTime: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="url" required className="w-full px-3 py-2 border border-gray-300 rounded-md" value={productForm.image} onChange={(e) => setProductForm({...productForm, image: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea required rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md" value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 font-medium">
            Upload Product
          </button>
        </form>
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/src/assets/logo.png" alt="Handmade Nexus" className="h-10 w-auto" />
              <h1 className="text-2xl font-bold text-primary-600">Handmade Nexus - Seller</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome</span>
              <button className="text-gray-500 hover:text-gray-700">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                                                    ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
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
    </div>
  )
}

export default SellerDashboard
