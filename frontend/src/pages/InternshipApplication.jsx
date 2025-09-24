import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  User, Mail, Phone, GraduationCap, Calendar, MapPin, Fingerprint, Send 
} from 'lucide-react';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    location: '',
    education: '',
    email: '',
    aadharNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for all fields
    const requiredFields = ['fullName', 'age', 'phone', 'location', 'education', 'email', 'aadharNumber'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return;
      }
    }
    // Aadhar number simple validation
    if (formData.aadharNumber.length !== 12 || !/^\d+$/.test(formData.aadharNumber)) {
        toast.error('Please enter a valid 12-digit Aadhar Number.');
        return;
    }

    setLoading(true);
    toast.loading('Submitting your details...');

    // --- MOCK SUBMISSION ---
    // In a real application, you would send this data to your secure backend.
    // NEVER store sensitive data like Aadhar numbers in a publicly accessible database.
    
    setTimeout(() => {
      console.log('Form Data Submitted:', formData);
      toast.dismiss();
      toast.success('Details submitted successfully!');
      setLoading(false);
      navigate('/'); // Redirect to homepage after submission
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Artisan Community Application</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please provide your details to join our community.
          </p>
        </div>

        <div className="mt-8 bg-white shadow-lg rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField name="fullName" label="Full Name" type="text" value={formData.fullName} onChange={handleChange} icon={User} required />
              <InputField name="age" label="Age" type="number" value={formData.age} onChange={handleChange} icon={Calendar} required />
              <InputField name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} icon={Phone} required />
              <InputField name="email" label="Email ID" type="email" value={formData.email} onChange={handleChange} icon={Mail} required />
              <InputField name="location" label="Current Location" type="text" value={formData.location} onChange={handleChange} icon={MapPin} required />
              <InputField name="education" label="Highest Education" type="text" value={formData.education} onChange={handleChange} icon={GraduationCap} required />
            </div>
            
            <div>
              <InputField 
                name="aadharNumber" 
                label="Aadhar Card Number" 
                type="text" 
                value={formData.aadharNumber} 
                onChange={handleChange} 
                icon={Fingerprint} 
                required 
                maxLength={12}
              />
              <p className="mt-2 text-xs text-gray-500">
                Your data is sensitive and will be kept confidential. Please ensure you are on a secure connection.
              </p>
            </div>


            {/* Submission */}
            <div className="text-right pt-4">
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-5 h-5 mr-2 -ml-1" />
                {loading ? 'Submitting...' : 'Submit Details'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper component for consistent input fields
const InputField = ({ name, label, type, value, onChange, icon: Icon, required = false, maxLength }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2"
        min={type === 'number' ? '18' : undefined} // Example: set min age to 18
      />
    </div>
  </div>
);

export default ApplicationForm;