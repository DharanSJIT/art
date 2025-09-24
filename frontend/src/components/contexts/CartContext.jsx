// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
    loadWishlist();
  }, []);

  const loadCart = () => {
    try {
      setLoading(true);
      const savedCart = localStorage.getItem('handmade_nexus_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading cart:', error);
      setLoading(false);
    }
  };

  const loadWishlist = () => {
    try {
      const savedWishlist = localStorage.getItem('handmade_nexus_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const addToCart = (product, quantity = 1) => {
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }

    const existingItem = cartItems.find(item => item.id === product.id);
    let newCartItems;

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.stockCount && newQuantity > product.stockCount) {
        toast.error(`Sorry, only ${product.stockCount} items available in stock`);
        return;
      }
      
      newCartItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: newQuantity }
          : item
      );
    } else {
      newCartItems = [...cartItems, { ...product, quantity }];
    }

    saveCart(newCartItems);
    toast.success(`${product.name} added to cart!`);
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    const itemToUpdate = cartItems.find(item => item.id === itemId);
    
    if (!itemToUpdate) return;
    
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    if (itemToUpdate.stockCount && quantity > itemToUpdate.stockCount) {
      toast.error(`Sorry, only ${itemToUpdate.stockCount} items available in stock`);
      return;
    }

    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    
    saveCart(updatedItems);
    toast.success('Cart updated');
  };

  const removeFromCart = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    saveCart(updatedItems);
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    saveCart([]);
    toast.success('Cart cleared');
  };

  const saveCart = (items) => {
    try {
      localStorage.setItem('handmade_nexus_cart', JSON.stringify(items));
      setCartItems(items);
    } catch (error) {
      console.error('Error saving cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const addToWishlist = (productId) => {
    if (wishlist.includes(productId)) return;
    
    const updatedWishlist = [...wishlist, productId];
    saveWishlist(updatedWishlist);
    toast.success('Added to wishlist');
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(id => id !== productId);
      const saveWishlist = (updatedWishlist) => {
    try {
      localStorage.setItem('handmade_nexus_wishlist', JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error('Error saving wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const toggleWishlist = (productId) => {
    const isInWishlist = wishlist.includes(productId);
    
    if (isInWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const clearWishlist = () => {
    saveWishlist([]);
    toast.success('Wishlist cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlist,
      loading,
      addToCart,
      updateCartItemQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      getCartTotal,
      getCartCount,
      isInWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};
