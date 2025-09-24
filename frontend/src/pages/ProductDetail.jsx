import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, MapPin, Heart, ShoppingCart, Truck, Shield, MessageCircle, User } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProductDetail()
  }, [id])

  const fetchProductDetail = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setProduct({
          id: parseInt(id),
          name: 'Handmade Ceramic Vase',
          price: 399,
          originalPrice: 499,
          images: [
            'https://m.media-amazon.com/images/I/71Oz0k1FovL.jpg',
         
          ],
          seller: {
            name: 'John Potter',
            location: 'Chennai, Tamil Nadu',
            rating: 4.8,
            totalSales: 156,
            memberSince: '2020',
            image: 'https://via.placeholder.com/100x100?text=JP'
          },
          category: 'pottery',
          rating: 4.7,
          reviews: 23,
          description: `This beautiful handcrafted ceramic vase represents the finest in traditional pottery artistry. Each piece is individually shaped on a potter's wheel using locally sourced clay, then fired at high temperatures to ensure durability and beauty.

Key Features:
• Hand-thrown on potter's wheel
• High-temperature fired for durability  
• Food-safe glazes used
• Unique traditional patterns
• Perfect for fresh or dried flowers
• Microwave and dishwasher safe

The intricate designs are hand-painted using traditional techniques passed down through generations. Each vase is unique, with slight variations that add to its artisanal charm.`,
          specifications: {
            'Material': 'High-quality ceramic clay',
            'Dimensions': '8" H x 4" W',
            'Weight': '1.2 lbs',
            'Finish': 'Glazed',
            'Care': 'Dishwasher safe, handle with care',
            'Origin': 'Handmade in Chennai, India'
          },
          deliveryInfo: {
            estimatedDays: '5-7 business days',
            shippingCost: 'Free shipping on orders over $50',
            returnPolicy: '30-day return policy',
            warranty: '1-year craftsmanship warranty'
          },
          inStock: true,
          stockCount: 8,
          reviews: [
            {
              id: 1,
              userName: 'Sarah M.',
              rating: 5,
              date: '2024-01-10',
              comment: 'Absolutely beautiful! The craftsmanship is exceptional and it looks perfect in my living room.',
              verified: true
            },
            {
              id: 2,
              userName: 'Mike R.',
              rating: 4,
              date: '2024-01-05',
              comment: 'Good quality vase, well-packaged. Took a bit longer to deliver than expected but worth the wait.',
              verified: true
            },
            {
              id: 3,
              userName: 'Lisa K.',
              rating: 5,
              date: '2023-12-28',
              comment: 'This is my third purchase from this artisan. Consistently amazing work!',
              verified: true
            }
          ],
          relatedProducts: [
            {
              id: 7,
              name: 'Ceramic Bowl Set',
              price: 299,
              image: 'https://market99.com/cdn/shop/files/WW10005909-1.1_6ded6141-5ef3-4564-9cef-0cd303b0b5ae.jpg?v=1750238169',
              rating: 4.6
            },
            {
              id: 8,
              name: 'Pottery Dinner Plate',
              price: 399,
              image: 'https://nestasia.in/cdn/shop/products/DIN04-VERAWHITE-BN820CN_1.jpg?v=1706785497&width=600',
              rating: 4.8
            }
          ]
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching product:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Return to home
          </Link>
        </div>
      </div>
    )
  }

  const averageRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                to="/customer/dashboard"
                className="flex items-center text-primary-600 hover:text-primary-700 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Products
              </Link>
              <h1 className="text-2xl font-bold text-primary-600">Handmade Nexus</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-primary-600">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-600">
                <ShoppingCart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-medium text-gray-900 ml-1">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-500 ml-1">({product.reviews.length} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary-600">Rs. {product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    Rs. {product.originalPrice}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Save Rs. {(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Artisan Information</h3>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={product.seller.image}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{product.seller.name}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.seller.location}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Rating</span>
                  <p className="font-medium">{product.seller.rating}/5</p>
                </div>
                <div>
                  <span className="text-gray-500">Sales</span>
                  <p className="font-medium">{product.seller.totalSales}</p>
                </div>
                <div>
                  <span className="text-gray-500">Since</span>
                  <p className="font-medium">{product.seller.memberSince}</p>
                </div>
              </div>
              <button className="mt-3 w-full py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Contact Artisan
              </button>
            </div>

            {/* Purchase Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">({product.stockCount} available)</span>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                  Add to Cart
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Delivery Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium">{product.deliveryInfo.estimatedDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">{product.deliveryInfo.shippingCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Returns:</span>
                  <span className="font-medium">{product.deliveryInfo.returnPolicy}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-1" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>Verified Artisan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === tab
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {product.description}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50">
                    Write a Review
                  </button>
                </div>
                
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{review.userName}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More from this Artisan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      Rs. {relatedProduct.price}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
