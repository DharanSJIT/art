// src/components/cart/CartIconWithCounter.jsx
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import MiniCart from './MiniCart';

const CartIconWithCounter = () => {
  const { getCartCount } = useCart();
  const [isMiniCartOpen, setMiniCartOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setMiniCartOpen(true)}
        className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="w-6 h-6" />
        {getCartCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getCartCount()}
          </span>
        )}
      </button>
      
      <MiniCart 
        isOpen={isMiniCartOpen} 
        onClose={() => setMiniCartOpen(false)} 
      />
    </>
  );
};

export default CartIconWithCounter;
