const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  image: String,
  images: [String],
  seller: {
    id: String,
    name: String,
    location: String,
    rating: Number,
    verified: Boolean,
    responseTime: String,
    totalSales: Number,
    memberSince: String
  },
  category: String,
  rating: Number,
  reviewCount: Number,
  description: String,
  deliveryTime: String,
  inStock: { type: Boolean, default: true },
  stockCount: Number,
  isPopular: Boolean,
  isFeatured: Boolean,
  discount: Number,
  tags: [String],
  specifications: mongoose.Schema.Types.Mixed,
  shippingCost: Number,
  freeShipping: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
