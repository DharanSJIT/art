import React, { useState, useEffect } from 'react'
import { Package, CheckCircle, AlertCircle, Search, Edit, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const ProductsTab = ({ currentUser, sellerData }) => {
  const [myProducts, setMyProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: ''
  })

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
        toast.success(editingProduct ? 'Product updated!' : 'Product uploaded!')
        setProductForm({ name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: '' })
        setEditingProduct(null)
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
  }

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/products/${productId}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Product deleted!')
        fetchMyProducts()
      }
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <h3 className="text-3xl font-bold text-gray-900">{myProducts.length}</h3>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">In Stock</p>
              <h3 className="text-3xl font-bold text-green-600">{myProducts.filter(p => p.stockCount > 0).length}</h3>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
              <h3 className="text-3xl font-bold text-red-600">{myProducts.filter(p => p.stockCount === 0).length}</h3>
            </div>
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          {editingProduct && (
            <button onClick={() => { setEditingProduct(null); setProductForm({ name: '', price: '', originalPrice: '', image: '', category: '', description: '', stockCount: '', deliveryTime: '' }); }} className="text-sm text-gray-600 hover:text-gray-900">
              Cancel Editing
            </button>
          )}
        </div>
        <form onSubmit={handleProductSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} placeholder="Enter product name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}>
                <option value="">Select category</option>
                <option value="pottery">Pottery</option>
                <option value="woodwork">Woodwork</option>
                <option value="textiles">Textiles</option>
                <option value="jewelry">Jewelry</option>
                <option value="metalwork">Metalwork</option>
                <option value="leather">Leather</option>
                <option value="painting">Painting</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
              <input type="number" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price (₹)</label>
              <input type="number" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.originalPrice} onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Count</label>
              <input type="number" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.stockCount} onChange={(e) => setProductForm({...productForm, stockCount: e.target.value})} placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Time</label>
              <input type="text" required placeholder="e.g., 5-7 days" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.deliveryTime} onChange={(e) => setProductForm({...productForm, deliveryTime: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
            <input type="url" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.image} onChange={(e) => setProductForm({...productForm, image: e.target.value})} placeholder="https://example.com/image.jpg" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea required rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} placeholder="Describe your product..." />
          </div>
          <button type="submit" className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg hover:bg-orange-700 font-semibold text-lg transition-colors">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">My Products</h2>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search products..." className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
        </div>
        {myProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No products yet. Add your first product above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProducts.map((product) => (
              <div key={product._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${product.stockCount > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">₹{product.price}</p>
                      <p className="text-sm text-gray-400 line-through">₹{product.originalPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Stock</p>
                      <p className="text-lg font-bold text-gray-900">{product.stockCount}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(product)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                      <Trash2 className="w-4 h-4" /> Delete
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
