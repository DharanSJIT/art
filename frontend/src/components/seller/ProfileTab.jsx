import React from 'react'
import { User, Star, Package, CheckCircle, TrendingUp, MapPin, Phone, Mail, Calendar, Briefcase, Home, Award, Shield, Target } from 'lucide-react'

const ProfileTab = ({ sellerData }) => (
  <div className="space-y-8">
    {/* Header Section with Soft Background */}
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="relative">
        <div className="h-[240px] bg-cover bg-center" style={{ backgroundImage: 'url(/src/assets/seller_bg.png)' }}>
          {/* Profile Section */}
          <div className="absolute top-6 left-8 flex items-center space-x-6">
            {/* Profile Avatar */}
            <div className="relative border-[3px] border-orange-500 rounded-[28px]">
              <div className="w-40 h-40 bg-white rounded-3xl border-6 border-white shadow-profile flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-orange-100 rounded-full opacity-20"></div>
                  <User className="w-20 h-20 text-orange-700 relative" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-sm border border-gray-200">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="pt-4">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">{sellerData.name}</h2>
                <div className="bg-white/90 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Verified Seller
                </div>
              </div>
              
              <p className="text-lg text-white font-semibold drop-shadow-lg mb-4">{sellerData.productType} Specialist</p>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center bg-white/90 px-3 py-1.5 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-800 ml-1.5">{sellerData.rating}/5</span>
                  <span className="text-xs text-gray-500 ml-2">Rating</span>
                </div>
                
                <div className="flex items-center bg-white/90 px-3 py-1.5 rounded-lg">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800 ml-1.5">{sellerData.totalOrders}</span>
                  <span className="text-xs text-gray-500 ml-2">Orders</span>
                </div>
                
                <div className="flex items-center bg-white/90 px-3 py-1.5 rounded-lg">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-gray-800 ml-1.5">{sellerData.experience}</span>
                  <span className="text-xs text-gray-500 ml-2">Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-8 pb-8">
        </div>
      </div>
    </div>

    {/* Personal Information Section */}
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
          <p className="text-gray-600 mt-1">Seller details and contact information</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
          <User className="w-5 h-5 text-orange-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details Card */}
        <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <User className="w-4 h-4 mr-2 text-gray-600" />
            Personal Details
          </h4>
          <div className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <p className="text-gray-900 font-medium">{sellerData.name}</p>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600">Age</label>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <p className="text-gray-900 font-medium">{sellerData.age || 'Not specified'}</p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600">Experience</label>
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                <p className="text-gray-900 font-medium">{sellerData.experience || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Phone className="w-4 h-4 mr-2 text-gray-600" />
            Contact Information
          </h4>
          <div className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <p className="text-gray-900 font-medium">{sellerData.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600">Phone Number</label>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                <p className="text-gray-900 font-medium">{sellerData.phone || 'Not provided'}</p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600">Alternate Phone</label>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                <p className="text-gray-900 font-medium">{sellerData.alternatePhoneNumber || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Location & Specialization Section - Separate Row */}
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Location & Specialization</h3>
          <p className="text-gray-600 mt-1">Service area and expertise details</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Specialization Card */}
        <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Target className="w-4 h-4 mr-2 text-gray-600" />
            Specialization & Expertise
          </h4>
          <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-600">Primary Specialization</label>
              <div className="inline-flex items-center px-4 py-2.5 bg-orange-50 text-orange-800 rounded-xl text-base font-semibold border border-orange-100">
                {sellerData.productType || 'General Goods'}
              </div>
              <p className="text-sm text-gray-600">
                Specialist in high-quality {sellerData.productType?.toLowerCase() || 'products'} with extensive market knowledge
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Additional Skills</label>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">Quality Assurance</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">Timely Delivery</span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">Customer Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details Card */}
        <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-600" />
            Location Details
          </h4>
          <div className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600">Full Address</label>
              <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
                <Home className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-900 font-medium leading-relaxed">
                  {sellerData.address || 'Address not provided'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">City</label>
                <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-gray-900 font-medium">{sellerData.city || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">State</label>
                <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-gray-900 font-medium">{sellerData.state || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Pincode</label>
                <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-gray-900 font-medium">{sellerData.pincode || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Currently serving customers in {sellerData.city || 'this region'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Performance Stats Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 hover:shadow-gentle transition-shadow duration-300 hover-lift">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 px-3 py-1 bg-gray-100 rounded-full">Total</span>
        </div>
        <p className="text-5xl font-bold text-gray-900 mb-2">{sellerData.totalOrders}</p>
        <p className="text-gray-600 font-medium">Total Orders</p>
        <p className="text-sm text-gray-500 mt-3">All-time orders received</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 hover:shadow-gentle transition-shadow duration-300 hover-lift">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 px-3 py-1 bg-gray-100 rounded-full">Completed</span>
        </div>
        <p className="text-5xl font-bold text-gray-900 mb-2">{sellerData.completedOrders}</p>
        <p className="text-gray-600 font-medium">Completed Orders</p>
        <p className="text-sm text-gray-500 mt-3">Successfully delivered to customers</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 hover:shadow-gentle transition-shadow duration-300 hover-lift">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 px-3 py-1 bg-gray-100 rounded-full">Performance</span>
        </div>
        <p className="text-5xl font-bold text-gray-900 mb-2">
          {Math.round((sellerData.completedOrders / sellerData.totalOrders) * 100) || 0}%
        </p>
        <p className="text-gray-600 font-medium">Success Rate</p>
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((sellerData.completedOrders / sellerData.totalOrders) * 100) || 0}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Order completion rate based on total orders</p>
        </div>
      </div>
    </div>

    {/* Additional Information Footer */}
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="text-sm text-gray-600">
          <p>Member since: <span className="font-medium text-gray-900">2020</span></p>
          <p className="mt-1">Last profile update: <span className="font-medium text-gray-900">2 days ago</span></p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-600 mr-1.5" />
            <span>Verified Identity</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-blue-600 mr-1.5" />
            <span>Background Checked</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-orange-600 mr-1.5" />
            <span>Serving: {sellerData.city || 'Local Area'}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProfileTab