import React, { useState, useEffect } from 'react'
import { Search, Star, MapPin, Clock } from 'lucide-react'

const CollaborationTab = () => {
  const [collaborators, setCollaborators] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const { collection, getDocs } = await import('firebase/firestore')
        const { db } = await import('../../firebase')
        const sellersSnapshot = await getDocs(collection(db, 'sellers'))
        const sellersData = sellersSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || 'Unknown',
          skill: doc.data().productType || 'Artisan',
          rating: 4.5,
          location: `${doc.data().city || ''}, ${doc.data().state || ''}`.trim().replace(/^,\s*|,\s*$/g, '') || 'India',
          experience: doc.data().experience || 'N/A',
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.data().name || 'User')}&background=fed7aa&color=ea580c&size=100`
        }))
        setCollaborators(sellersData)
      } catch (error) {
        console.error('Failed to fetch sellers:', error)
      }
    }
    fetchSellers()
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Find Collaborators</h2>
            <p className="text-sm text-gray-500 mt-1">Connect with skilled artisans</p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Search by skill..." className="pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full md:w-80" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborators.filter(collab => collab.skill.toLowerCase().includes(searchTerm.toLowerCase())).map((collaborator) => (
            <div key={collaborator.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-orange-300">
              <div className="flex items-center space-x-4 mb-4">
                <img src={collaborator.image} alt={collaborator.name} className="w-16 h-16 rounded-full border-2 border-orange-200" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{collaborator.name}</h3>
                  <p className="text-sm text-orange-600 font-medium">{collaborator.skill}</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {collaborator.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                  {collaborator.rating}/5 Rating
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {collaborator.experience}
                </div>
              </div>
              <button className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                Connect Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CollaborationTab
