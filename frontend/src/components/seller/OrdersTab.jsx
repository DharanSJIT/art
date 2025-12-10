import React, { useState } from 'react'
import { Eye } from 'lucide-react'

const OrdersTab = () => {
  const [orders] = useState([
    {
      id: 'ORD001',
      customerName: 'Alice Johnson',
      product: 'Ceramic Vase Set',
      quantity: 2,
      amount: 89.98,
      status: 'pending',
      orderDate: '2024-01-15',
      deliveryAddress: 'Bangalore, Karnataka'
    },
    {
      id: 'ORD002',
      customerName: 'Bob Smith',
      product: 'Handmade Pottery Bowls',
      quantity: 4,
      amount: 156.00,
      status: 'completed',
      orderDate: '2024-01-12',
      deliveryAddress: 'Mumbai, Maharashtra'
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-2">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-2">Completed</p>
          <p className="text-3xl font-bold text-green-600">{orders.filter(o => o.status === 'completed').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-2">Revenue</p>
          <p className="text-3xl font-bold text-orange-600">₹{orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.deliveryAddress}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.product}</div>
                    <div className="text-xs text-gray-500">Qty: {order.quantity}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.orderDate}</td>
                  <td className="px-6 py-4">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrdersTab
