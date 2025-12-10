import React, { useState } from 'react'
import { Star, DollarSign, CreditCard, CheckCircle, AlertCircle, FileText } from 'lucide-react'

const LoanTab = () => {
  const [loanData] = useState({
    currentLoans: [
      {
        id: 'LOAN001',
        amount: 50000,
        purpose: 'Raw Material Purchase',
        status: 'active',
        emi: 2500,
        remainingAmount: 35000,
        nextDueDate: '2024-02-15',
        interestRate: 12.5,
        tenure: '24 months'
      },
      {
        id: 'LOAN002',
        amount: 25000,
        purpose: 'Equipment Purchase',
        status: 'pending',
        emi: 0,
        remainingAmount: 25000,
        nextDueDate: null,
        interestRate: 11.0,
        tenure: '18 months'
      }
    ],
    creditScore: 720,
    eligibleAmount: 75000,
    totalDisbursed: 50000,
    totalRepaid: 15000
  })

  const [loanApplication, setLoanApplication] = useState({
    amount: '',
    purpose: '',
    tenure: '',
    businessRevenue: '',
    collateral: ''
  })

  const getLoanStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleLoanApplication = (e) => {
    e.preventDefault()
    console.log('Loan application submitted:', loanApplication)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Credit Score</p>
              <p className="text-2xl font-bold">{loanData.creditScore}</p>
            </div>
            <Star className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Eligible Amount</p>
              <p className="text-2xl font-bold">₹{loanData.eligibleAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Disbursed</p>
              <p className="text-2xl font-bold">₹{loanData.totalDisbursed.toLocaleString()}</p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Repaid</p>
              <p className="text-2xl font-bold">₹{loanData.totalRepaid.toLocaleString()}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Loans</h3>
          <div className="space-y-4">
            {loanData.currentLoans.map((loan) => (
              <div key={loan.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{loan.id}</h4>
                    <p className="text-sm text-gray-600">{loan.purpose}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLoanStatusColor(loan.status)}`}>
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Loan Amount</p>
                    <p className="font-medium">₹{loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Remaining</p>
                    <p className="font-medium">₹{loan.remainingAmount.toLocaleString()}</p>
                  </div>
                  {loan.status === 'active' && (
                    <>
                      <div>
                        <p className="text-gray-500">Monthly EMI</p>
                        <p className="font-medium">₹{loan.emi.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Next Due</p>
                        <p className="font-medium">{loan.nextDueDate}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-gray-500">Interest Rate</p>
                    <p className="font-medium">{loan.interestRate}% p.a.</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tenure</p>
                    <p className="font-medium">{loan.tenure}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Apply for New Loan</h3>
          <form onSubmit={handleLoanApplication} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
              <input type="number" value={loanApplication.amount} onChange={(e) => setLoanApplication({...loanApplication, amount: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Enter loan amount" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select value={loanApplication.purpose} onChange={(e) => setLoanApplication({...loanApplication, purpose: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent" required>
                <option value="">Select purpose</option>
                <option value="raw-materials">Raw Materials</option>
                <option value="equipment">Equipment Purchase</option>
                <option value="working-capital">Working Capital</option>
                <option value="business-expansion">Business Expansion</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Repayment Tenure</label>
              <select value={loanApplication.tenure} onChange={(e) => setLoanApplication({...loanApplication, tenure: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent" required>
                <option value="">Select tenure</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="18">18 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Business Revenue (₹)</label>
              <input type="number" value={loanApplication.businessRevenue} onChange={(e) => setLoanApplication({...loanApplication, businessRevenue: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Enter monthly revenue" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Collateral (Optional)</label>
              <textarea value={loanApplication.collateral} onChange={(e) => setLoanApplication({...loanApplication, collateral: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent" rows="3" placeholder="Describe any collateral you can offer" />
            </div>

            <button type="submit" className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors font-medium">
              Submit Application
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Loan Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Maintain regular order completion for better credit score</li>
              <li>• Upload business documents for faster approval</li>
              <li>• Consider collateral for lower interest rates</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Eligibility & Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Eligibility Criteria</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Active seller for 6+ months</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Minimum 4.0 rating</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Regular order completion</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
                <span>Valid business documents</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Required Documents</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-500 mr-2" />
                <span>PAN Card & Aadhaar Card</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-500 mr-2" />
                <span>Bank statements (6 months)</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-500 mr-2" />
                <span>Business registration certificate</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-500 mr-2" />
                <span>GST registration (if applicable)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanTab
