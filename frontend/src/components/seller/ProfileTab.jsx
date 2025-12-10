import React from 'react'
import { User, Star, Package, CheckCircle, TrendingUp } from 'lucide-react'

const ProfileTab = ({ sellerData }) => (
  <div className="space-y-6">
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

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">Full Name</label>
          <p className="text-gray-900 text-lg">{sellerData.name}</p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">Age</label>
          <p className="text-gray-900 text-lg">{sellerData.age || 'N/A'}</p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">Email Address</label>
          <p className="text-gray-900 text-lg">{sellerData.email}</p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">Phone Number</label>
          <p className="text-gray-900 text-lg">{sellerData.phone || 'N/A'}</p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">Alternate Phone</label>
          <p className="text-gray-900 text-lg">{sellerData.alternatePhoneNumber || 'N/A'}</p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">Specialization</label>
          <p className="text-gray-900 text-lg">{sellerData.productType || 'N/A'}</p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">Experience</label>
          <p className="text-gray-900 text-lg">{sellerData.experience || 'N/A'}</p>
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-semibold text-gray-500">Address</label>
          <p className="text-gray-900 text-lg">{sellerData.address || 'N/A'}</p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">City</label>
          <p className="text-gray-900 text-lg">{sellerData.city || 'N/A'}</p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">State</label>
          <p className="text-gray-900 text-lg">{sellerData.state || 'N/A'}</p>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-gray-500">Pincode</label>
          <p className="text-gray-900 text-lg">{sellerData.pincode || 'N/A'}</p>
        </div>
      </div>
    </div>

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

export default ProfileTab
