import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

// Import pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import UserTypePage from './pages/UserTypePage'
import CustomerDashboard from './pages/CustomerDashboard'
import SellerRegistration from './pages/SellerRegistration'
import SellerKYC from './pages/SellerKYC'
import SellerDashboard from './pages/SellerDashboard'
import ProductDetail from './pages/ProductDetail'
import LandingPage from './pages/LandingPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import CheckoutPage from './pages/CheckoutPage'

// Import cart and wishlist components
import ShoppingCart from './components/cart/ShoppingCart'
import Wishlist from './components/wishlist/Wishlist'
import CustomerAccount from './components/account/CustomerAccount'

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/user-type" element={<UserTypePage />} />
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/seller/register" element={<SellerRegistration />} />
              <Route path="/seller/kyc" element={<SellerKYC />} />
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/home" element={<HomePage />} />
              
              {/* Cart and checkout related routes */}
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<CustomerAccount />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
