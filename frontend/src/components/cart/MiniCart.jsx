// src/components/cart/MiniCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const MiniCart = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItemQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Mini Cart Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Cart ({cartItems.length})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 px-4 py-6 sm:px-6">
              {cartItems.length > 0 ? (
                <>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <li key={item.id} className="py-6 flex">
                          <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <Link 
                                  to={`/product/${item.id}`}
                                  className="hover:text-primary-600"
                                >
                                  <h3 className="line-clamp-2">{item.name}</h3>
                                </Link>
                                <p className="ml-4">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                               Rs. {item.price.toFixed(2)} each
                              </p>
                            </div>
                            
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center">
                                <button
                                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                  className="text-gray-500 hover:text-gray-700"
                                  disabled={item.quantity <= 1}
                                >
                                  <span className="sr-only">Decrease quantity</span>
                                  <span className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-md">
                                    -
                                  </span>
                                </button>
                                
                                <span className="mx-2 text-gray-700">
                                  {item.quantity}
                                </span>
                                
                                <button
                                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                  className="text-gray-500 hover:text-gray-700"
                                  disabled={item.stockCount && item.quantity >= item.stockCount}
                                >
                                  <span className="sr-only">Increase quantity</span>
                                  <span className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-md">
                                    +
                                  </span>
                                </button>
                              </div>
                              
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                      <p>Subtotal</p>
                      <p>${getCartTotal().toFixed(2)}</p>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={clearCart}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Cart
                      </button>
                      
                      <Link
                        to="/cart"
                        className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                        onClick={onClose}
                      >
                        Checkout
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={onClose}
                        className="text-sm font-medium text-primary-600 hover:text-primary-500"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
