// LoanEvaluation.jsx - Alternative version using regular axios
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanEvaluation = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    seller_id: '',
    craft_type: '',
    transaction_history: {
      total_orders: '',
      completed_orders: '',
      delayed_orders: '',
      revenue_last_6m: ''
    },
    reviews: [''],
    collaborations: ''
  });

  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use your backend URL directly
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('transaction_history.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        transaction_history: {
          ...prev.transaction_history,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleReviewChange = (index, value) => {
    const newReviews = [...formData.reviews];
    newReviews[index] = value;
    setFormData(prev => ({ ...prev, reviews: newReviews }));
  };

  const addReview = () => {
    setFormData(prev => ({
      ...prev,
      reviews: [...prev.reviews, '']
    }));
  };

  const removeReview = (index) => {
    if (formData.reviews.length > 1) {
      const newReviews = formData.reviews.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, reviews: newReviews }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEvaluation(null);

    try {
      const requestData = {
        seller_id: formData.seller_id,
        craft_type: formData.craft_type,
        transaction_history: {
          total_orders: parseInt(formData.transaction_history.total_orders) || 0,
          completed_orders: parseInt(formData.transaction_history.completed_orders) || 0,
          delayed_orders: parseInt(formData.transaction_history.delayed_orders) || 0,
          revenue_last_6m: parseInt(formData.transaction_history.revenue_last_6m) || 0
        },
        reviews: formData.reviews.filter(review => review.trim() !== ''),
        collaborations: parseInt(formData.collaborations) || 0
      };

      console.log('Sending request to backend:', requestData);

      // Use direct axios call instead of axiosInstance
      const response = await axios.post(`${API_BASE_URL}/loan/evaluate`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 150000
      });

      console.log('Backend response:', response.data);

      if (response.data.success) {
        setEvaluation(response.data.data);
      } else {
        setError(response.data.message || 'Evaluation failed');
      }

    } catch (err) {
      console.error('Error:', err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timeout. The AI is taking too long to respond.');
      } else {
        setError('Failed to evaluate loan. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* <button
                onClick={() => navigate('/dashboard')}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                ← Back to Dashboard
              </button> */}
              <h1 className="text-xl font-semibold text-gray-900">Loan Evaluation</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r bg-primary-400 text-white p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-center">Artisan Loan Evaluation</h1>
          <p className="text-center mt-2 opacity-90">AI-Powered Credit Assessment</p>
        </div>

        <div className="bg-white shadow-lg rounded-b-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seller ID *
                </label>
                <input
                  type="text"
                  name="seller_id"
                  value={formData.seller_id}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., S123"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Craft Type *
                </label>
                <select
                  name="craft_type"
                  value={formData.craft_type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Select craft type</option>
                  <option value="saree">Saree</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="pottery">Pottery</option>
                  <option value="textiles">Textiles</option>
                  <option value="handicraft">Handicraft</option>
                  <option value="woodwork">Woodwork</option>
                </select>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Orders</label>
                  <input
                    type="number"
                    name="transaction_history.total_orders"
                    value={formData.transaction_history.total_orders}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="120"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Completed Orders</label>
                  <input
                    type="number"
                    name="transaction_history.completed_orders"
                    value={formData.transaction_history.completed_orders}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="110"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delayed Orders</label>
                  <input
                    type="number"
                    name="transaction_history.delayed_orders"
                    value={formData.transaction_history.delayed_orders}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="5"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Revenue (6 months) ₹</label>
                  <input
                    type="number"
                    name="transaction_history.revenue_last_6m"
                    value={formData.transaction_history.revenue_last_6m}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="150000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
                <button
                  type="button"
                  onClick={addReview}
                  className="px-4 py-2 bg-primary-400 text-white rounded-lg  transition-colors"
                >
                  Add Review
                </button>
              </div>
              {formData.reviews.map((review, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <textarea
                    value={review}
                    onChange={(e) => handleReviewChange(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter customer review..."
                    rows="2"
                  />
                  {formData.reviews.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeReview(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Collaborations */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Collaborations
              </label>
              <input
                type="number"
                name="collaborations"
                value={formData.collaborations}
                onChange={handleInputChange}
                className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="3"
                min="0"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r bg-primary-400 text-white font-semibold rounded-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Evaluating with AI...
                  </span>
                ) : (
                  'Evaluate Loan Eligibility'
                )}
              </button>
            </div>
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Results Display */}
          {evaluation && (
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Evaluation Results</h2>
                <p className="text-gray-600">Seller ID: {evaluation.seller_id}</p>
              </div>

              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-white-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-sm font-medium opacity-90">Risk Score</h4>
                  <p className="text-3xl font-bold">{evaluation.risk_score}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border-2">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Risk Tier</h4>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getRiskColor(evaluation.risk_tier)}`}>
                    {evaluation.risk_tier}
                  </span>
                </div>

                <div className={`p-6 rounded-lg shadow-lg ${evaluation.loan_eligibility ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  <h4 className="text-sm font-medium opacity-90">Loan Eligibility</h4>
                  <p className="text-2xl font-bold">
                    {evaluation.loan_eligibility ? 'Eligible' : 'Not Eligible'}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-sm font-medium opacity-90">Recommended Amount</h4>
                  <p className="text-2xl font-bold">
                    ₹{evaluation.recommended_loan_amount?.toLocaleString() || '0'}
                  </p>
                  <p className="text-sm opacity-90">Batch Size: {evaluation.batch_size || 0}</p>
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Analysis & Reasoning</h3>
                <div className="space-y-3">
                  {evaluation.reasoning?.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2"/>
                      <p className="text-gray-700 leading-relaxed">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanEvaluation;
