import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Globe, Star, Check } from 'lucide-react';
import userTypeBg from '../assets/user_type_bg.png';

// Reusable Background Wave Component
const BackgroundWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Bottom Right Wave (Rotated) */}
     
    </div>
  );
};

// Reusable Role Card Component
const RoleCard = ({ title, description, benefits, buttonText, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl border-1 border-orange-200 transition-all duration-300 border border-gray-100 p-8 cursor-pointer flex flex-col h-full transform hover:-translate-y-1 relative z-10"
  >
    <div className="flex-grow text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-8 leading-relaxed">
        {description}
      </p>
      
      <div className="space-y-3 mb-8 text-left">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center text-sm text-gray-500">
            <Check className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
    
    <button className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 transition-all duration-200">
      {buttonText}
    </button>
  </div>
);

const UserTypePage = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    if (type === 'customer') {
      navigate('/login', { state: { userType: 'customer' } });
    } else if (type === 'seller') {
      navigate('/seller/login');
    } else if (type === 'intern') {
      navigate('/internships/apply');
    }
  };

  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      description: 'Browse and purchase unique handmade products from skilled artisans.',
      buttonText: 'Continue as Customer',
      benefits: [
        'Discover unique handmade items',
        'Direct communication with sellers',
        'Track orders and delivery',
        'Review and rate products'
      ]
    },
    {
      id: 'seller',
      title: 'Seller',
      description: 'Sell your handmade creations and connect with customers worldwide.',
      buttonText: 'Continue as Seller',
      benefits: [
        'Showcase your products',
        'Collaborate with other artisans',
        'Access to suppliers',
        'Manage orders efficiently'
      ]
    },
    {
      id: 'intern',
      title: 'Intern',
      description: 'Join our team to learn and contribute to a vibrant artisan community.',
      buttonText: 'Apply as Intern',
      benefits: [
        'Gain real-world experience',
        'Work on exciting projects',
        'Mentorship from experts',
        'Build your professional portfolio'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white relative flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${userTypeBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8 }}></div>
      {/* Background Layer */}
      <BackgroundWaves />

      <div className="mx-auto relative z-10 px-4" style={{ width: '78vw' }}>
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Welcome to Handmade Nexus!
          </h2>
          <p className="text-lg text-gray-500">
            Choose your role to get started
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              title={role.title}
              description={role.description}
              benefits={role.benefits}
              buttonText={role.buttonText}
              onClick={() => handleUserTypeSelection(role.id)}
            />
          ))}
        </div>

        {/* Footer Trust Indicators */}
        <div className="text-center border-t border-gray-100 pt-8 max-w-2xl mx-auto">
          <p className="text-gray-500 text-sm mb-6">
            Join over 50,000 creators and customers in our trusted community
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Secure Platform</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Star className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">5-Star Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypePage;