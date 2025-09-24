// src/components/account/CustomerAccount.jsx
import React, { useState } from 'react';
import { 
  User, Package, Heart, Clock, Settings, LogOut, 
  CreditCard, MapPin, Mail, Phone, Check, Shield, 
  Edit2, AlertTriangle, Copy, ChevronDown, Eye, EyeOff, 
  Key
} from 'lucide-react';
import toast from 'react-hot-toast';

const CustomerAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India',
    },
    profilePicture: null,
    joinDate: '2022-05-15T10:30:00Z',
    password: '********',
    notifications: {
      orderUpdates: true,
      promotions: true,
      newArrivals: false,
      recommendations: true,
    },
    paymentMethods: [
      {
        id: 'pm1',
        type: 'credit',
        name: 'Visa ending in 4242',
        expires: '05/25',
        isDefault: true,
      }
    ]
  });

  // Mock orders data
  const [orders] = useState([
    {
      id: 'ORD12345',
      date: '2023-11-10T14:30:00Z',
      total: 149.98,
      status: 'delivered',
      items: [
        {
          id: 1,
          name: 'Handmade Ceramic Vase',
          image: 'https://picsum.photos/200/200?random=1',
          price: 49.99,
          quantity: 1,
        },
        {
          id: 2,
          name: 'Solid Oak Coffee Table',
          image: 'https://picsum.photos/200/200?random=2',
          price: 99.99,
          quantity: 1,
        }
      ],
      trackingNumber: 'TRK87654321',
    },
    {
      id: 'ORD12346',
      date: '2023-10-25T09:15:00Z',
      total: 79.99,
      status: 'processing',
      items: [
        {
          id: 3,
          name: 'Handwoven Pure Silk Scarf',
          image: 'https://picsum.photos/200/200?random=3',
          price: 79.99,
          quantity: 1,
        }
      ],
    }
  ]);

  // Form state for editing profile
  const [formData, setFormData] = useState({
    ...userData
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else if (name.startsWith('notifications.')) {
      const notificationField = name.split('.')[1];
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [notificationField]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const saveProfile = () => {
    // In a real app, this would be an API call
    setUserData(formData);
    setEditMode(false);
    toast.success('Profile updated successfully');
  };

  const cancelEdit = () => {
    setFormData(userData);
    setEditMode(false);
  };

    const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {/* Profile Summary */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                {userData.profilePicture ? (
                  <img 
                    src={userData.profilePicture} 
                    alt={userData.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-primary-600" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{userData.name}</div>
                <div className="text-sm text-gray-500">Member since {formatDate(userData.joinDate)}</div>
              </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="mt-4 space-y-1">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Orders</span>
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'wishlist' 
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'payment' 
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Payment Methods</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => toast.success('Logged out successfully')} // Mock logout
                className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
              
              {editMode ? (
                // Edit Profile Form
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input 
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input 
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input 
                          type="text"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                        <input 
                          type="text"
                          name="address.pincode"
                          value={formData.address.pincode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input 
                          type="text"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={saveProfile}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                // View Profile
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="mt-1 text-gray-900">{userData.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-gray-900">{userData.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                      <p className="mt-1 text-gray-900">{userData.phone}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                      <p className="mt-1 text-gray-900">{formatDate(userData.joinDate)}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Address</h3>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-900">{userData.address.street}</p>
                        <p className="text-gray-900">{userData.address.city}, {userData.address.state} {userData.address.pincode}</p>
                        <p className="text-gray-900">{userData.address.country}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Account Security</h3>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900">Your account is secure</p>
                        <p className="text-sm text-gray-500 mt-1">Last password change: 3 months ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>
                <p className="text-gray-500 mt-1">Track, view and manage your orders</p>
              </div>
              
              {orders.length > 0 ? (
                <div>
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      className="p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                          <h3 className="font-medium text-gray-900">
                            Order #{order.id}
                            <button 
                              onClick={() => copyToClipboard(order.id)} 
                              className="ml-2 text-gray-400 hover:text-gray-600"
                              aria-label="Copy order ID"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </h3>
                          <span className="text-sm text-gray-500">{formatDateTime(order.date)}</span>
                          <span 
                            className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusBadgeClass(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="font-medium text-gray-900">${order.total.toFixed(2)}</div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                ${item.price.toFixed(2)} × {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        <button
                          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm"
                        >
                          View Order Details
                        </button>
                        
                        {order.status === 'delivered' && (
                          <button
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
                          >
                            Write a Review
                          </button>
                        )}
                        
                        {order.status === 'processing' || order.status === 'pending' ? (
                          <button
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
                          >
                            Cancel Order
                          </button>
                        ) : null}
                        
                        {order.trackingNumber && (
                          <button
                            className="px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 text-sm"
                          >
                            Track Package
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                  <p className="text-gray-500 mb-4">When you place an order, they will appear here</p>
                  <button
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Payment Methods Tab */}
          {activeTab === 'payment' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                <p className="text-gray-500 mt-1">Manage your payment methods</p>
              </div>
              
              <div className="p-6">
                {userData.paymentMethods.length > 0 ? (
                  <div className="space-y-4">
                    {userData.paymentMethods.map(method => (
                      <div key={method.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="w-8 h-8 text-gray-700" />
                            <div>
                              <p className="font-medium text-gray-900">{method.name}</p>
                              <p className="text-sm text-gray-500">Expires {method.expires}</p>
                            </div>
                            {method.isDefault && (
                              <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-500 hover:text-gray-700">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      className="mt-4 flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Add new payment method</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <CreditCard className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No payment methods yet</h3>
                    <p className="text-gray-500 mb-4">Add a payment method to make checkout faster</p>
                    <button
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                      Add Payment Method
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                <p className="text-gray-500 mt-1">Manage your account preferences and security</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Notification Preferences */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Notification Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Order Updates</p>
                        <p className="text-sm text-gray-500">Receive notifications about your orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          name="notifications.orderUpdates"
                          checked={formData.notifications.orderUpdates}
                          onChange={handleInputChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Promotions & Offers</p>
                        <p className="text-sm text-gray-500">Receive notifications about discounts and special offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          name="notifications.promotions"
                          checked={formData.notifications.promotions}
                          onChange={handleInputChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">New Arrivals</p>
                        <p className="text-sm text-gray-500">Get notified when new products are added</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          name="notifications.newArrivals"
                          checked={formData.notifications.newArrivals}
                          onChange={handleInputChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">Personalized Recommendations</p>
                        <p className="text-sm text-gray-500">Get product recommendations based on your preferences</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          name="notifications.recommendations"
                          checked={formData.notifications.recommendations}
                          onChange={handleInputChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Security Settings */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Security Settings</h3>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => toast.success('Password reset email sent!')}
                      className="flex items-center space-x-3 text-primary-600 hover:text-primary-700"
                    >
                      <Key className="w-5 h-5" />
                      <span>Change Password</span>
                    </button>
                    
                    <button
                      onClick={() => toast.success('Two-factor authentication setup initiated')}
                      className="flex items-center space-x-3 text-primary-600 hover:text-primary-700"
                    >
                      <Shield className="w-5 h-5" />
                      <span>Setup Two-Factor Authentication</span>
                    </button>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Account Activity</h4>
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="flex items-start space-x-3 text-sm">
                          <Clock className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-gray-900">Last login: Today, 10:23 AM</p>
                            <p className="text-gray-500 mt-1">From Mumbai, Maharashtra using Chrome on Windows</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Danger Zone */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-red-600 mb-3">Danger Zone</h3>
                  <div className="bg-red-50 rounded-md p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-red-600 font-medium">Delete Account</p>
                        <p className="text-red-600 opacity-75 text-sm mt-1">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button
                          onClick={() => toast.error('Account deletion is disabled in this demo')}
                          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Save Settings */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setUserData(formData);
                      toast.success('Settings saved successfully');
                    }}
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
                <p className="text-gray-500 mt-1">View and manage your saved items</p>
              </div>
              
              <div className="p-6">
                <div className="text-center py-10">
                  <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your wishlist will appear here</h3>
                  <p className="text-gray-500 mb-4">
                    Add products you love to your wishlist by clicking the heart icon
                  </p>
                  <button
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Explore Products
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
