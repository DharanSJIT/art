import React, { useState } from 'react'
import { Plus, MapPin, Star } from 'lucide-react'

const SupplyTab = () => {
  const [suppliers] = useState([
    {
      id: 1,
      name: 'Clay & More Supplies',
      materials: ['Premium Clay', 'Glazes', 'Tools'],
      location: 'Chennai, Tamil Nadu',
      rating: 4.6,
      minOrder: 1000,
      contact: '+91 9876543210'
    },
    {
      id: 2,
      name: 'Artisan Raw Materials',
      materials: ['Wood', 'Paints', 'Brushes'],
      location: 'Bangalore, Karnataka',
      rating: 4.8,
      minOrder: 500,
      contact: '+91 9876543211'
    }
  ])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Raw Material Suppliers</h2>
            <p className="text-sm text-gray-500 mt-1">Find quality materials for your craft</p>
          </div>
          <button className="flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
            <Plus className="w-5 h-5 mr-2" />
            Request Quote
          </button>
        </div>

        <div className="space-y-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-orange-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-xl mb-2">{supplier.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      {supplier.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                      {supplier.rating}/5 Rating
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold whitespace-nowrap">
                  Contact Supplier
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-3">Available Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {supplier.materials.map((material, index) => (
                    <span key={index} className="px-4 py-2 bg-orange-50 text-orange-700 text-sm rounded-lg font-medium border border-orange-200">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Min Order:</span>
                  <span className="font-bold text-gray-900 ml-2">₹{supplier.minOrder}</span>
                </div>
                <div>
                  <span className="text-gray-500">Contact:</span>
                  <span className="font-bold text-gray-900 ml-2">{supplier.contact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupplyTab
