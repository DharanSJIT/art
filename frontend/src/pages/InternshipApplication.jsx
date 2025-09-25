import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { 
  User, Mail, Phone, GraduationCap, Calendar, MapPin, Fingerprint, Send, MessageSquare 
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
    aadharNumber: '',
    experience: '' // 1. Added new state for the experience field
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

    // 2. Added 'experience' to the list of required fields
    const requiredFields = ['fullName', 'age', 'phone', 'location', 'education', 'email', 'aadharNumber', 'experience'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return;
      }
    }
    if (formData.aadharNumber.length !== 12 || !/^\d+$/.test(formData.aadharNumber)) {
        toast.error('Please enter a valid 12-digit Aadhar Number.');
        return;
    }

    setLoading(true);
    toast.loading('Submitting your details...');

    const templateParams = {
        fullName: formData.fullName,
        age: formData.age,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        education: formData.education,
        aadharNumber: formData.aadharNumber,
        experience: formData.experience, // 3. Added experience to the data sent via email
    };

    try {
        await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        toast.dismiss();
        toast.success('Details submitted successfully!');
        navigate('/'); // Redirect on success
    } catch (error) {
        toast.dismiss();
        console.error('EmailJS Error:', error);
        toast.error('Failed to send application. Please try again later.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          {/* 4. Changed the title and description */}
          <h2 className="text-3xl font-extrabold text-gray-900">Internship Application Form</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please fill out the details below to apply for our internship program.
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
                Your data is sensitive and will be kept confidential.
              </p>
            </div>

            {/* 5. Added the new description/experience textarea */}
            <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
                  Share Your Experience
                </label>
                <textarea 
                  id="experience" 
                  name="experience" 
                  rows="5" 
                  value={formData.experience} 
                  onChange={handleChange} 
                  required 
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2" 
                  placeholder="Tell us about your previous experience, skills, or why you are interested in this internship..."
                ></textarea>
            </div>

            <div className="text-right pt-4">
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-5 h-5 mr-2 -ml-1" />
                {loading ? 'Submitting...' : 'Submit Application'}
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
        min={type === 'number' ? '18' : undefined}
      />
    </div>
  </div>
);

export default ApplicationForm;