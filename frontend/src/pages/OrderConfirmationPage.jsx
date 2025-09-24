// src/pages/OrderConfirmationPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import OrderConfirmation from "../components/checkout/OrderConfirmation";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Try to get order from state (passed during navigation)
    if (location.state && location.state.order) {
      setOrderData(location.state.order);
      setLoading(false);
      return;
    }
    
    // If no order in state, fetch it (or use mock data for demo)
    const fetchOrderData = async () => {
      try {
        // In a real app, you would fetch from your API:
        // const response = await fetch(`/api/orders/${orderId}`);
        // const data = await response.json();
        
        // For demo purposes, we'll create a mock order:
        const mockOrderData = {
          orderId: orderId || 'ORD12345',
          orderDate: new Date().toISOString(),
          status: 'confirmed',
          subtotal: 3450,
          tax: 276,
          shipping: {
            cost: 150,
            method: 'Express Delivery',
            address: {
              houseNo: '42',
              line1: 'Artisan Lane',
              line2: 'Craft District',
              city: 'Mumbai',
              state: 'Maharashtra',
              country: 'India',
              pin: '400001'
            }
          },
          importDuty: 0, // No import duty for domestic orders
          total: 3876,
          payment: {
            method: 'Card',
            details: {
              cardType: 'Visa',
              lastFour: '4242'
            }
          },
          items: [
            {
              id: 'prod123',
              name: 'Handmade Ceramic Vase with Traditional Blue Pottery Patterns',
              price: 1450,
              quantity: 1,
              image: 'https://picsum.photos/200/200?random=1'
            },
            {
              id: 'prod456',
              name: 'Handwoven Pure Silk Scarf with Traditional Motifs',
              price: 2000,
              quantity: 1,
              image: 'https://picsum.photos/200/200?random=2'
            }
          ]
        };
        
        setOrderData(mockOrderData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };
    
    fetchOrderData();
  }, [orderId, location]);
  
  // Redirect to home if no orderId
  if (!orderId && !location.state?.order && !loading) {
    return <Navigate to="/" />;
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }
  
  if (!orderData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-4">We couldn't find the order you're looking for.</p>
          <a href="/" className="text-primary-600 hover:text-primary-700">Return to Home</a>
        </div>
      </div>
    );
  }
  
  return <OrderConfirmation order={orderData} />;
};

export default OrderConfirmationPage;
