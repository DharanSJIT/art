require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

const products = [
  {
    name: 'Handmade Ceramic Vase',
    price: 45.99,
    originalPrice: 59.99,
    image: 'https://m.media-amazon.com/images/I/71Oz0k1FovL.jpg',
    seller: {
      id: 'seller1',
      name: 'John Potter',
      location: 'Chennai, Tamil Nadu',
      rating: 4.8,
      verified: true,
      responseTime: '2 hours',
      totalSales: 156,
      memberSince: '2020'
    },
    category: 'pottery',
    rating: 4.7,
    reviewCount: 23,
    description: 'Beautiful handcrafted ceramic vase',
    deliveryTime: '5-7 days',
    inStock: true,
    stockCount: 12,
    isPopular: true,
    discount: 23,
    tags: ['handmade', 'ceramic'],
    shippingCost: 5.99,
    freeShipping: false
  },
  {
    name: 'Bamboo Crafts',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/7/HY/CM/JB/139461272/bamboo-handicrafts-1531714725-4104928.jpeg',
    seller: {
      id: 'seller2',
      name: 'Sarah Carpenter',
      location: 'Bangalore, Karnataka',
      rating: 4.9,
      verified: true,
      responseTime: '1 hour',
      totalSales: 89,
      memberSince: '2019'
    },
    category: 'woodwork',
    rating: 4.8,
    reviewCount: 45,
    description: 'Handcrafted solid oak coffee table',
    deliveryTime: '10-14 days',
    inStock: true,
    stockCount: 5,
    isPopular: false,
    discount: 20,
    tags: ['furniture', 'oak'],
    shippingCost: 0,
    freeShipping: true
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    await Product.insertMany(products);
    console.log('✅ Seeded', products.length, 'products');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
