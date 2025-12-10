import React, { useState, useEffect } from 'react'
import { Plus, MapPin, Star, X, Clock, Package, Trash2 } from 'lucide-react'
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase.js'
import toast from 'react-hot-toast'

const SupplyTab = ({ currentUser, sellerData }) => {
  const [suppliers, setSuppliers] = useState([])
  const [myQuotes, setMyQuotes] = useState([])
  const [incomingQuotes, setIncomingQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [quoteToDelete, setQuoteToDelete] = useState(null)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [quoteForm, setQuoteForm] = useState({ material: '', quantity: '', message: '' })

  useEffect(() => {
    fetchSuppliers()
    fetchMyQuotes()
    fetchIncomingQuotes()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const suppliersRef = collection(db, 'suppliers')
      const snapshot = await getDocs(suppliersRef)
      const suppliersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setSuppliers(suppliersList)
    } catch (error) {
      console.error('Error fetching suppliers:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMyQuotes = async () => {
    try {
      const quotesRef = collection(db, 'quoteRequests')
      const snapshot = await getDocs(quotesRef)
      let quotesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log('My email:', sellerData?.email)
      console.log('All quotes:', quotesList.map(q => ({ email: q.sellerEmail, material: q.material })))
      
      // Filter by current user - match by email as primary identifier
      if (sellerData?.email) {
        quotesList = quotesList.filter(q => q.sellerEmail === sellerData.email)
      }
      
      console.log('My filtered quotes:', quotesList.length)
      setMyQuotes(quotesList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } catch (error) {
      console.error('Error fetching quotes:', error)
    }
  }

  const fetchIncomingQuotes = async () => {
    try {
      const quotesRef = collection(db, 'quoteRequests')
      const snapshot = await getDocs(quotesRef)
      let quotesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      // Filter quotes where current seller is NOT the requester
      if (sellerData?.email) {
        quotesList = quotesList.filter(q => q.sellerEmail !== sellerData.email)
      }
      
      setIncomingQuotes(quotesList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } catch (error) {
      console.error('Error fetching incoming quotes:', error)
    }
  }

  const handleDeleteQuote = async () => {
    if (!quoteToDelete) return
    try {
      await deleteDoc(doc(db, 'quoteRequests', quoteToDelete))
      toast.success('Quote request deleted successfully!')
      setShowDeleteModal(false)
      setQuoteToDelete(null)
      fetchMyQuotes()
      fetchIncomingQuotes()
    } catch (error) {
      console.error('Error deleting quote:', error)
      toast.error('Failed to delete quote request')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading suppliers...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* My Quote Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">My Quote Requests ({myQuotes.length})</h2>
          <button 
            onClick={() => {
              setSelectedSupplier(null)
              setShowQuoteModal(true)
            }}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Request Quote
          </button>
        </div>
        {myQuotes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No quote requests yet. Submit a quote to see it here!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myQuotes.map((quote) => (
              <div key={quote.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4 text-orange-600" />
                      <h4 className="text-xl font-semibold  text-gray-900">{quote.material}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        quote.status === 'approved' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {quote.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Quantity:</span> {quote.quantity}</p>
                      <p><span className="font-medium">Supplier:</span> {quote.supplierName}</p>
                      {quote.message && <p><span className="font-medium">Message:</span> {quote.message}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-right text-xs text-gray-500">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => {
                        setQuoteToDelete(quote.id)
                        setShowDeleteModal(true)
                      }}
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-lg font-medium flex items-center gap-1 whitespace-nowrap"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Incoming Quote Requests from Other Sellers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quote Requests from Other Sellers ({incomingQuotes.length})</h2>
        {incomingQuotes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No incoming quote requests yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {incomingQuotes.map((quote) => (
              <div key={quote.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <h4 className=" text-xl font-semibold text-gray-900">{quote.material}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        quote.status === 'approved' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {quote.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className=" font-medium ">Requested by:</span> {quote.sellerName || 'Unknown'}</p>
                      <p><span className="font-medium">Quantity:</span> {quote.quantity}</p>
                      {quote.message && <p><span className="font-medium">Message:</span> {quote.message}</p>}
                      {quote.sellerPhone && (
                        <p><span className="font-medium">Contact:</span> {quote.sellerPhone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-right text-xs text-gray-500 mb-2">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </div>
                    {quote.sellerPhone && (
                      <button
                        onClick={() => {
                          window.location.href = `tel:${quote.sellerPhone}`
                          toast.success(`Calling ${quote.sellerName}...`)
                        }}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-md font-medium whitespace-nowrap"
                      >
                        Contact Seller
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quote Request Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Request Quote</h3>
              <button onClick={() => setShowQuoteModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault()
              setSubmitting(true)
              try {
                if (!sellerData?.email) {
                  toast.error('Seller email not found. Please update your profile.')
                  setSubmitting(false)
                  return
                }
                
                const quoteData = {
                  material: quoteForm.material,
                  quantity: quoteForm.quantity,
                  message: quoteForm.message || '',
                  status: 'pending',
                  createdAt: new Date().toISOString(),
                  sellerId: currentUser?.uid || sellerData.email,
                  sellerName: sellerData.name || 'Unknown Seller',
                  sellerEmail: sellerData.email,
                  sellerPhone: sellerData.phone || ''
                }
                if (selectedSupplier?.id) quoteData.supplierId = selectedSupplier.id
                if (selectedSupplier?.name) quoteData.supplierName = selectedSupplier.name
                else quoteData.supplierName = 'Any Supplier'
                
                console.log('Submitting quote with email:', quoteData.sellerEmail)
                await addDoc(collection(db, 'quoteRequests'), quoteData)
                toast.success('Quote request submitted successfully!')
                setQuoteForm({ material: '', quantity: '', message: '' })
                setSelectedSupplier(null)
                setShowQuoteModal(false)
                fetchMyQuotes()
                fetchIncomingQuotes()
              } catch (error) {
                console.error('Error submitting quote:', error)
                toast.error('Failed to submit quote request')
              } finally {
                setSubmitting(false)
              }
            }} className="space-y-4">
              {selectedSupplier && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700">Requesting quote from:</p>
                  <p className="text-base font-bold text-orange-700">{selectedSupplier.name}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material Type *</label>
                <input
                  type="text"
                  required
                  value={quoteForm.material}
                  onChange={(e) => setQuoteForm({...quoteForm, material: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                  placeholder="e.g., Premium Clay, Wood"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                <input
                  type="text"
                  required
                  value={quoteForm.quantity}
                  onChange={(e) => setQuoteForm({...quoteForm, quantity: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                  placeholder="e.g., 50 kg, 100 units"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                <textarea
                  rows="3"
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                  placeholder="Any specific requirements..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowQuoteModal(false)
                    setSelectedSupplier(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Quote Request?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this quote request? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setQuoteToDelete(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteQuote}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-md font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupplyTab
