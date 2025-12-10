import React, { useState, useEffect } from 'react'
import { 
  Package, CheckCircle, AlertCircle, Search, Edit, Trash2, 
  Plus, X, Tag, DollarSign, Calendar, Hash, Image as ImageIcon,
  FileText, TrendingUp, BarChart3, Layers, Clock, Award, Star
} from 'lucide-react'
import toast from 'react-hot-toast'

const ProductsTab = ({ currentUser, sellerData }) => {
  const [myProducts, setMyProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    fetchMyProducts()
  }, [])

  const fetchMyProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products`)
      const data = await response.json()
      if (data.success) {
        const sellerProducts = data.data.products.filter(p => p.seller?.id === currentUser?.uid || p.seller?.name === sellerData.name)
        setMyProducts(sellerProducts)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    const stockCount = parseInt(productForm.stockCount)
    if (stockCount <= 0) {
      toast.error('Stock count must be greater than 0')
      return
    }

    try {
      const url = editingProduct 
        ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products/${editingProduct._id}`
        : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products`
      
      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          originalPrice: parseFloat(productForm.originalPrice),
          stockCount: stockCount,
          seller: {
            id: currentUser?.uid,
            name: sellerData.name,
            location: sellerData.address,
            rating: sellerData.rating,
            verified: true
          },
          rating: editingProduct?.rating || 4.5,
          reviewCount: editingProduct?.reviewCount || 0,
          inStock: stockCount > 0,
          isPopular: editingProduct?.isPopular || false,
          isFeatured: editingProduct?.isFeatured || false,
          discount: Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100),
          tags: [productForm.category],
          shippingCost: 0,
          freeShipping: true
        })
      })
      const data = await response.json()
      if (data.success) {
        toast.success(editingProduct ? 'Product updated successfully!' : 'Product added to your collection!')
        setProductForm({ name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: '' })
        setEditingProduct(null)
        setIsFormVisible(false)
        fetchMyProducts()
      }
    } catch (error) {
      toast.error('Failed to save product')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      description: product.description,
      stockCount: product.stockCount,
      deliveryTime: product.deliveryTime
    })
    setIsFormVisible(true)
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to remove this product from your collection?')) return
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products/${productId}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Product removed from collection')
        fetchMyProducts()
      }
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const filteredProducts = myProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category) => {
    const colors = {
      'pottery': 'bg-orange-50 text-orange-700 border-orange-200',
      'woodwork': 'bg-amber-50 text-amber-700 border-amber-200',
      'textiles': 'bg-blue-50 text-blue-700 border-blue-200',
      'jewelry': 'bg-purple-50 text-purple-700 border-purple-200',
      'metalwork': 'bg-gray-50 text-gray-700 border-gray-200',
      'leather': 'bg-red-50 text-red-700 border-red-200',
      'painting': 'bg-green-50 text-green-700 border-green-200'
    }
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  const totalValue = myProducts.reduce((sum, product) => sum + (product.price * product.stockCount), 0)
  const averagePrice = myProducts.length > 0 ? totalValue / myProducts.reduce((sum, product) => sum + product.stockCount, 0) : 0

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product Collection</h1>
                <p className="text-gray-600 mt-2">Manage your handmade products and track inventory</p>
              </div>
            </div>
            
            
          </div>
          
          <button
            onClick={() => {
              setIsFormVisible(!isFormVisible)
              if (editingProduct) {
                setEditingProduct(null)
                setProductForm({ name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: '' })
              }
            }}
            className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold flex items-center gap-2 whitespace-nowrap"
          >
            {isFormVisible ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {isFormVisible ? 'Close Form' : 'Add Product'}
          </button>
        </div>
      </div>
      {/* Product Form - Collapsible */}
      {isFormVisible && (
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 animate-slideIn">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <Plus className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Edit Product Details' : 'Add New Product to Collection'}
                </h2>
                <p className="text-gray-600 mt-1">Fill in the details below to {editingProduct ? 'update' : 'add'} your product</p>
              </div>
            </div>
            {editingProduct && (
              <button
                onClick={() => {
                  setEditingProduct(null)
                  setProductForm({ name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: '' })
                }}
                className="text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
          </div>
          
          <form onSubmit={handleProductSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                {/* <Tag className="w-5 h-5 text-gray-400" /> */}
                <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Category *</label>
                  <select
                    required
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900"
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  >
                    <option value="">Select a category</option>
                    <option value="pottery">Pottery</option>
                    <option value="woodwork">Woodwork</option>
                    <option value="textiles">Textiles</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="metalwork">Metalwork</option>
                    <option value="leather">Leather</option>
                    <option value="painting">Painting</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                {/* <DollarSign className="w-5 h-5 text-gray-400" /> */}
                <h3 className="text-xl font-semibold text-gray-900">Pricing & Inventory</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Selling Price (₹) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      required
                      className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Original Price (₹) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      required
                      className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Stock Count *</label>
                  <div className="relative">
                    {/* <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" /> */}
                    <input
                      type="number"
                      required
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                      value={productForm.stockCount}
                      onChange={(e) => setProductForm({...productForm, stockCount: e.target.value})}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Delivery Time *</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      required
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                      value={productForm.deliveryTime}
                      onChange={(e) => setProductForm({...productForm, deliveryTime: e.target.value})}
                      placeholder="5-7 days"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Media & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                {/* <ImageIcon className="w-5 h-5 text-gray-400" /> */}
                <h3 className="text-xl font-semibold text-gray-900">Media & Description</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Product Image URL *</label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                    value={productForm.image}
                    onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                    placeholder="https://example.com/your-product-image.jpg"
                  />
                  {productForm.image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                      <img src={productForm.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Product Description *</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 text-gray-400 w-4 h-4" />
                    <textarea
                      required
                      rows="4"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      placeholder="Describe your product in detail..."
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Include details about materials, dimensions, and craftsmanship</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-semibold text-lg transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
              >
                {editingProduct ? (
                  <>
                    <Edit className="w-5 h-5" />
                    Update Product
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add to Collection
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Products</h2>
            <p className="text-gray-600 mt-1">Manage your collection of handmade products</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 w-full md:w-80 bg-gray-50 text-gray-900 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
            <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {myProducts.length === 0 ? 'Your collection is empty' : 'No matching products found'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {myProducts.length === 0 
                ? 'Start building your product collection by adding your first handmade item.'
                : 'Try adjusting your search terms or filters to find what you\'re looking for.'
              }
            </p>
            {myProducts.length === 0 && !isFormVisible && (
              <button
                onClick={() => setIsFormVisible(true)}
                className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Add Your First Product
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-gentle hover:border-orange-200 transition-all duration-300 group">
                {/* Product Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold ${product.stockCount > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {product.stockCount > 0 ? `${product.stockCount} in stock` : 'Out of stock'}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3 mb-3">
  <div className="min-w-0 flex-1">
    <h3 className="font-bold text-gray-900 text-base group-hover:text-orange-700 transition-colors line-clamp-2 leading-tight mb-1.5">
      {product.name}
    </h3>
  </div>
  <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(product.category)} leading-none whitespace-nowrap flex-shrink-0`}>
    {product.category}
  </div>
</div>
              </div>

              {/* Pricing & Info */}
              <div className="flex items-center justify-between pt-1">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-orange-600 leading-none">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through leading-none">₹{product.originalPrice}</span>
                    )}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded leading-none">
                        Save ₹{product.originalPrice - product.price}
                      </span>
                      <span className="text-[10px] font-semibold text-green-700 leading-none">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center justify-end gap-1 text-xs text-gray-600 leading-tight">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    {product.deliveryTime}
                    <p>days</p>
                  </div>
                  {product.rating && (
                    <div className="flex items-center justify-end gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description Preview */}
              <p className="text-md text-gray-600 leading-relaxed line-clamp-2 min-h-[2.5rem] pt-1">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 py-3 px-3 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-medium flex items-center justify-center gap-1.5 text-sm leading-none"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit Details
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 py-2 px-3 bg-white text-red-600 rounded-lg border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 font-medium flex items-center justify-center gap-1.5 text-xs leading-none"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsTab