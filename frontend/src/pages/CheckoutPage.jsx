// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, ShoppingBag, Shield, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'India',
      pin: ''
    },
    payment: {
      method: 'card',
      card: {
        number: '',
        name: '',
        expiry: '',
        cvc: ''
      },
      upi: {
        id: ''
      }
    }
  });

  useEffect(() => {
    // Get order data from location state
    if (location.state && location.state.orderData) {
      setOrderData(location.state.orderData);
      setLoading(false);
    } else {
      // Redirect to cart if no order data
      toast.error('Invalid checkout session');
      navigate('/cart');
    }
  }, [location, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handlePaymentMethodChange = (method) => {
    setFormData({
      ...formData,
      payment: {
        ...formData.payment,
        method
      }
    });
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      payment: {
        ...formData.payment,
        card: {
          ...formData.payment.card,
          [name]: value
        }
      }
    });
  };

  const handleUpiInputChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      payment: {
        ...formData.payment,
        upi: {
          id: value
        }
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    // In a real app, you would submit the order to your API
    // For demo purposes, simulate a delay and then navigate to order confirmation
    
    setTimeout(() => {
      // Generate mock order
      const mockOrder = {
        orderId: 'ORD' + Math.floor(100000 + Math.random() * 900000),
        orderDate: new Date().toISOString(),
        status: 'confirmed',
        subtotal: orderData.pricing.subtotal,
        tax: orderData.pricing.tax,
        shipping: {
          cost: orderData.pricing.shipping,
          method: 'Standard Delivery',
          address: {
            houseNo: '',
            line1: formData.address.line1,
            line2: formData.address.line2,
            city: formData.address.city,
            state: formData.address.state,
            country: formData.address.country,
            pin: formData.address.pin
          }
        },
        importDuty: 0,
        total: orderData.pricing.total,
        payment: {
          method: formData.payment.method === 'card' ? 'Card' : 'UPI',
          details: formData.payment.method === 'card' ? {
            cardType: 'Visa',
            lastFour: formData.payment.card.number.slice(-4)
          } : {
            upiId: formData.payment.upi.id
          }
        },
        items: orderData.items
      };
      
      // Clear cart after successful order
      localStorage.setItem('handmade_nexus_cart', JSON.stringify([]));
      
      // Navigate to order confirmation with the order details
      navigate(`/order-confirmation/${mockOrder.orderId}`, { state: { order: mockOrder } });
      
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return null; // This shouldn't happen due to the navigation in useEffect
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mt-8 mb-16">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address.line1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                  <input
                    type="text"
                    id="address.line1"
                    name="address.line1"
                    value={formData.address.line1}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="House No, Street"
                  />
                </div>
                <div>
                  <label htmlFor="address.line2" className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                  <input
                    type="text"
                    id="address.line2"
                    name="address.line2"
                    value={formData.address.line2}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Apartment, Suite, Unit, etc. (optional)"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      id="address.city"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
                    <input
                      type="text"
                      id="address.state"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="address.pin" className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      id="address.pin"
                      name="address.pin"
                      value={formData.address.pin}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <select
                      id="address.country"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div
                    onClick={() => handlePaymentMethodChange('card')}
                    className={`flex-1 border rounded-lg p-4 cursor-pointer ${
                      formData.payment.method === 'card' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.payment.method === 'card' ? 'border-primary-500' : 'border-gray-400'
                      }`}>
                        {formData.payment.method === 'card' && (
                          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">Credit/Debit Card</span>
                    </div>
                    <p className="text-sm text-gray-500">Pay securely with your card</p>
                  </div>
                  
                  <div
                    onClick={() => handlePaymentMethodChange('upi')}
                    className={`flex-1 border rounded-lg p-4 cursor-pointer ${
                      formData.payment.method === 'upi' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.payment.method === 'upi' ? 'border-primary-500' : 'border-gray-400'
                      }`}>
                        {formData.payment.method === 'upi' && (
                          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">UPI Payment</span>
                    </div>
                    <p className="text-sm text-gray-500">Pay using UPI apps like Google Pay, PhonePe</p>
                  </div>
                </div>
                
                {formData.payment.method === 'card' ? (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                      <input
                        type="text"
                        id="card-number"
                        name="number"
                        value={formData.payment.card.number}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        maxLength="16"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
                      <input
                        type="text"
                        id="card-name"
                        name="name"
                        value={formData.payment.card.name}
                        onChange={handleCardInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date (MM/YY) *</label>
                        <input
                          type="text"
                          id="card-expiry"
                          name="expiry"
                          value={formData.payment.card.expiry}
                          onChange={handleCardInputChange}
                          placeholder="MM/YY"
                          required
                          maxLength="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="card-cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC/CVV *</label>
                        <input
                          type="text"
                          id="card-cvc"
                          name="cvc"
                          value={formData.payment.card.cvc}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          required
                          maxLength="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-1">UPI ID *</label>
                    <input
                      type="text"
                      id="upi-id"
                      value={formData.payment.upi.id}
                      onChange={handleUpiInputChange}
                      placeholder="username@upi"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter your UPI ID (e.g., yourname@okbank)</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between items-center mt-8">
                            <button
                type="button"
                onClick={() => navigate('/cart')}
                className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Cart
              </button>
              
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors w-full sm:w-auto font-medium"
              >
                Place Order
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 sticky top-20">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-700 mb-2">
                {orderData.items.length} {orderData.items.length === 1 ? 'Item' : 'Items'}
              </div>
              
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md border border-gray-200 overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 line-clamp-1">{item.name}</div>
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">${orderData.pricing.subtotal.toFixed(2)}</span>
              </div>
              
              {orderData.coupon && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${orderData.pricing.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {orderData.pricing.shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${orderData.pricing.shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (7%)</span>
                <span className="text-gray-900">${orderData.pricing.tax.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="flex justify-between mb-6">
              <span className="text-gray-900 font-semibold">Total</span>
              <span className="text-xl text-primary-600 font-bold">${orderData.pricing.total.toFixed(2)}</span>
            </div>
            
            <div className="space-y-3 mt-6 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-start gap-2">
                <ShoppingBag className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span>All items are in stock and ready to ship</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span>Secure payments and data protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
