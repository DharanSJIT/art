// src/components/wishlist/Wishlist.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      
      // Load wishlist IDs from localStorage
      const savedWishlist = localStorage.getItem('handmade_nexus_wishlist');
      const ids = savedWishlist ? JSON.parse(savedWishlist) : [];
      setWishlistIds(ids);
      
      if (ids.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      // In a real app, you would fetch product details from API
      // For this example, we'll use the mock data
      // Simulating API call delay
      setTimeout(() => {
        const mockProducts = generateMockProducts();
        const wishlistProducts = mockProducts.filter(p => ids.includes(p.id));
        setProducts(wishlistProducts);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      toast.error('Failed to load your wishlist');
      setLoading(false);
    }
  };

  const generateMockProducts = () => {
    return [
      {
        id: 1,
        name: 'Handmade Ceramic Vase with Traditional Blue Pottery Patterns',
        price: 45.99,
        originalPrice: 59.99,
        image: 'https://thumbs.dreamstime.com/b/three-traditional-chinese-ceramic-vases-elegant-blue-floral-patterns-white-porcelain-antique-artwork-handmade-home-decor-still-387846306.jpg',
        seller: {
          name: 'John Potter',
          location: 'Chennai, Tamil Nadu',
        },
        category: 'pottery',
        rating: 4.7,
        reviewCount: 23,
        inStock: true,
        stockCount: 12,
        discount: 23,
      },
      {
        id: 2,
        name: 'Solid Oak Coffee Table with Intricate Carved Details',
        price: 199.99,
        originalPrice: 249.99,
        image: 'https://m.media-amazon.com/images/I/41hpaAyvK2L._UF894,1000_QL80_.jpg',
        seller: {
          name: 'Sarah Carpenter',
          location: 'Bangalore, Karnataka',
        },
        category: 'woodwork',
        rating: 4.8,
        reviewCount: 45,
        inStock: true,
        stockCount: 5,
        discount: 20,
      },
      // Add more mock products as needed
    ];
  };

  const saveWishlist = (ids) => {
    try {
      localStorage.setItem('handmade_nexus_wishlist', JSON.stringify(ids));
      setWishlistIds(ids);
    } catch (error) {
      console.error('Error saving wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedIds = wishlistIds.filter(id => id !== productId);
    saveWishlist(updatedIds);
    setProducts(products.filter(p => p.id !== productId));
    toast.success('Item removed from wishlist');
  };

  const clearWishlist = () => {
    saveWishlist([]);
    setProducts([]);
    toast.success('Wishlist cleared');
  };

  const addToCart = (product) => {
    try {
      if (!product.inStock) {
        toast.error('Product is out of stock');
        return;
      }

      const savedCart = localStorage.getItem('handmade_nexus_cart');
      const cartItems = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItem = cartItems.find(item => item.id === product.id);
      let newCartItems;

      if (existingItem) {
        if (existingItem.quantity >= product.stockCount) {
          toast.error('Cannot add more items. Stock limit reached.');
          return;
        }
        newCartItems = cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCartItems = [...cartItems, { ...product, quantity: 1 }];
      }

      localStorage.setItem('handmade_nexus_cart', JSON.stringify(newCartItems));
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const moveAllToCart = () => {
    try {
      const savedCart = localStorage.getItem('handmade_nexus_cart');
      const cartItems = savedCart ? JSON.parse(savedCart) : [];
      
      let newCartItems = [...cartItems];
      let addedCount = 0;

      products.forEach(product => {
        if (!product.inStock) return;
        
        const existingItem = newCartItems.find(item => item.id === product.id);
        
        if (existingItem) {
          if (existingItem.quantity < product.stockCount) {
            newCartItems = newCartItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            addedCount++;
          }
        } else {
          newCartItems.push({ ...product, quantity: 1 });
          addedCount++;
        }
      });

      localStorage.setItem('handmade_nexus_cart', JSON.stringify(newCartItems));
      
      if (addedCount > 0) {
        toast.success(`Added ${addedCount} item${addedCount > 1 ? 's' : ''} to cart`);
      } else {
        toast.error('No items could be added to cart');
      }
    } catch (error) {
      console.error('Error moving items to cart:', error);
      toast.error('Failed to move items to cart');
    }
  };

  const filteredProducts = searchTerm
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-4 md:p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-5 w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded mb-5 w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-4 md:p-6">
        <div className="text-center py-16">
          <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Add items you love to your wishlist and revisit them later</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist ({products.length})</h1>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your wishlist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={moveAllToCart}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add All to Cart
          </button>
          
          <button
            onClick={clearWishlist}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Wishlist
          </button>
        </div>
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">No items match your search for "{searchTerm}"</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
          >
            <div className="relative">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                aria-label="Remove from wishlist"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>
              
              {product.discount > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  -{product.discount}%
                </span>
              )}
              
              {!product.inStock && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <Link 
                to={`/product/${product.id}`} 
                className="text-gray-900 font-medium hover:text-primary-600 line-clamp-2 leading-tight mb-2"
              >
                {product.name}
              </Link>
              
              <p className="text-sm text-gray-600 mb-3">by {product.seller.name}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-primary-600">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                
                {product.inStock && product.stockCount <= 5 && (
                  <span className="text-xs text-orange-600">
                    Only {product.stockCount} left
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add to Cart
                </button>
                
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/customer/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
