import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { 
  User, Mail, Phone, GraduationCap, Calendar, MapPin, Fingerprint, Send, MessageSquare, Star,
  Briefcase, Lightbulb, Users // New icons for branding panel
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
    experience: '',
    skills: ''
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

    const requiredFields = ['fullName', 'age', 'phone', 'location', 'education', 'email', 'aadharNumber', 'experience', 'skills'];
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
        experience: formData.experience,
        skills: formData.skills,
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
        navigate('/user-type');
    } catch (error) {
        toast.dismiss();
        console.error('EmailJS Error:', error);
        toast.error('Failed to send application. Please try again later.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8">
      <div className="container mx-auto p-4 lg:p-8">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md border overflow-hidden">
          
          {/* Left Branding Panel */}
          <div className="md:w-2/5 bg-amber-600 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('/src/assets/intern.png')" }}></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
              <p className="mb-8 opacity-90">
                Become a vital part of our mission to empower local artisans. This is more than an internship—it's an opportunity to make a real impact.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <Lightbulb className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                  <span>Gain hands-on experience in marketing, community management, and e-commerce.</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                  <span>Work directly with talented artisans and help share their unique stories.</span>
                </li>
                <li className="flex items-start">
                  <Briefcase className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                  <span>Build a professional portfolio that showcases your skills and creativity.</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 text-center opacity-80 text-sm relative z-10">
              Handmade Nexus &copy; {new Date().getFullYear()}
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="md:w-3/5 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Internship Application</h2>
            <p className="text-gray-600 mb-8">Please fill in your details below.</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section: About You */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">About You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField name="fullName" label="Full Name" type="text" value={formData.fullName} onChange={handleChange} icon={User} required />
                  <InputField name="age" label="Age" type="number" value={formData.age} onChange={handleChange} icon={Calendar} required />
                  <InputField name="email" label="Email ID" type="email" value={formData.email} onChange={handleChange} icon={Mail} required />
                  <InputField name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} icon={Phone} required />
                  <InputField name="location" label="Current Location" type="text" value={formData.location} onChange={handleChange} icon={MapPin} required />
                </div>
              </section>

              {/* Section: Your Background */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Your Background</h3>
                <InputField name="education" label="Highest Education" type="text" value={formData.education} onChange={handleChange} icon={GraduationCap} required />
                <InputField name="skills" label="Skills" type="text" value={formData.skills} onChange={handleChange} icon={Star} required placeholder="e.g., Digital Marketing, Content Writing" />
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">Share Your Experience</label>
                  <textarea id="experience" name="experience" rows="5" value={formData.experience} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 block w-full p-3 transition" placeholder="Tell us about your previous experience..."></textarea>
                </div>
              </section>

              {/* Section: Verification */}
              <section>
                 <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Verification</h3>
                 <div className="mt-6">
                    <InputField name="aadharNumber" label="Aadhar Card Number" type="text" value={formData.aadharNumber} onChange={handleChange} icon={Fingerprint} required maxLength={12} />
                    <p className="mt-2 text-xs text-gray-500">Your data is sensitive and will be kept confidential.</p>
                 </div>
              </section>

              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300">
                  <Send className="w-5 h-5 mr-3" />
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated helper component for a more modern look
const InputField = ({ name, label, type, value, onChange, icon: Icon, required = false, maxLength, placeholder = '' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
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
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 block w-full pl-12 p-3 transition"
        min={type === 'number' ? '18' : undefined}
      />
    </div>
  </div>
);

export default ApplicationForm;