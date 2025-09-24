// src/components/cart/ShoppingCart.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      setLoading(true);
      const savedCart = localStorage.getItem('handmade_nexus_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast.error('Failed to load your cart');
      setLoading(false);
    }
  };

  const saveCartItems = (items) => {
    try {
      localStorage.setItem('handmade_nexus_cart', JSON.stringify(items));
      setCartItems(items);
    } catch (error) {
      console.error('Error saving cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    const itemToUpdate = cartItems.find(item => item.id === itemId);
    
    if (!itemToUpdate) return;
    
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    if (itemToUpdate.stockCount && newQuantity > itemToUpdate.stockCount) {
      toast.error(`Sorry, only ${itemToUpdate.stockCount} items available in stock`);
      return;
    }

    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    saveCartItems(updatedItems);
    toast.success('Cart updated');
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    saveCartItems(updatedItems);
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    saveCartItems([]);
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success('Cart cleared');
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    // Mock coupon validation
    const coupons = {
      'WELCOME10': { discount: 0.1, type: 'percentage', minOrder: 0 },
      'SAVE20': { discount: 0.2, type: 'percentage', minOrder: 100 },
      'FLAT30': { discount: 30, type: 'fixed', minOrder: 150 }
    };

    const coupon = coupons[couponCode.toUpperCase()];
    
    if (!coupon) {
      toast.error('Invalid coupon code');
      return;
    }

    const subtotal = calculateSubtotal();
    
    if (subtotal < coupon.minOrder) {
      toast.error(`This coupon requires a minimum order of $${coupon.minOrder}`);
      return;
    }

    setAppliedCoupon({ ...coupon, code: couponCode.toUpperCase() });
    toast.success('Coupon applied successfully!');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success('Coupon removed');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    const subtotal = calculateSubtotal();
    
    if (appliedCoupon.type === 'percentage') {
      return subtotal * appliedCoupon.discount;
    } else {
      return Math.min(appliedCoupon.discount, subtotal); // Don't discount more than subtotal
    }
  };

  const calculateShipping = () => {
    if (cartItems.length === 0) return 0;
    
    const subtotal = calculateSubtotal();
    // Free shipping over $100
    if (subtotal >= 100) return 0;

    // Calculate shipping based on items
    let shipping = cartItems.reduce((total, item) => {
      if (item.freeShipping) return total;
      return total + ((item.shippingCost || 5) * item.quantity);
    }, 0);
    
    // Cap shipping at $20
    return Math.min(shipping, 20);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.07; // 7% tax rate
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = calculateShipping();
    const tax = calculateTax();
    
    return subtotal - discount + shipping + tax;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Prepare order data to pass to checkout page
    const orderData = {
      items: cartItems,
      pricing: {
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        shipping: calculateShipping(),
        tax: calculateTax(),
        total: calculateTotal()
      },
      coupon: appliedCoupon
    };
    
    // Navigate to checkout page with the order data
    navigate('/checkout', { state: { orderData } });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4 md:p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-5 w-1/3"></div>
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 flex flex-col md:flex-row gap-4">
              <div className="h-24 w-24 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
              </div>
            ))}
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4 md:p-6">
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet</p>
          <Link 
            to="/customer/dashboard" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Cart Items ({cartItems.length})</h2>
              <button 
                onClick={clearCart}
                className="text-red-500 text-sm hover:underline flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear Cart
              </button>
            </div>
            
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="text-gray-900 font-medium hover:text-primary-600">
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">
                        By {item.seller?.name || 'Unknown Seller'}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 items-center mt-3">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={item.stockCount || 99}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-10 text-center border-x border-gray-300 py-1 text-sm"
                          />
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            aria-label="Increase quantity"
                            disabled={item.quantity >= (item.stockCount || 99)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 text-sm hover:underline flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      
                      {item.originalPrice && item.originalPrice > item.price && (
                        <div className="text-sm text-gray-500 line-through">
                          ${(item.originalPrice * item.quantity).toFixed(2)}
                        </div>
                      )}
                      
                      {item.freeShipping ? (
                        <div className="text-xs text-green-600 mt-1">Free Shipping</div>
                      ) : item.shippingCost ? (
                        <div className="text-xs text-gray-500 mt-1">+${item.shippingCost.toFixed(2)} shipping</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <Link to="/customer/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-700">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 sticky top-20">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Coupon Code */}
            <div className="mb-4 pb-4 border-b border-gray-100">
              {appliedCoupon ? (
                <div className="bg-green-50 p-2 rounded-md mb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-green-700 font-medium">{appliedCoupon.code}</div>
                      <div className="text-xs text-green-600">
                        {appliedCoupon.type === 'percentage' 
                          ? `${appliedCoupon.discount * 100}% off` 
                          : `$${appliedCoupon.discount.toFixed(2)} off`}
                      </div>
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900 font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${calculateDiscount().toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {calculateShipping() === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${calculateShipping().toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (7%)</span>
                <span className="text-gray-900">${calculateTax().toFixed(2)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="flex justify-between mb-6">
              <span className="text-gray-900 font-semibold">Total</span>
              <span className="text-xl text-primary-600 font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </button>
            
            <div className="text-xs text-gray-500 mt-4 text-center">
              Secure payments powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
