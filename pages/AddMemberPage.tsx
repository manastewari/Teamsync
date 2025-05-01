import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { AddMemberFormData } from '../types';
import { addMember } from '../services/api';

const AddMemberPage: React.FC = () => {
  const navigate = useNavigate();
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<AddMemberFormData>({
    name: '',
    role: '',
    email: '',
    phone: '',
    bio: '',
    skills: '',
    profileImage: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      setFormData({
        ...formData,
        profileImage: file
      });
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      profileImage: null
    });
    setImagePreview(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setFormError('Name is required');
      return false;
    }
    if (!formData.role.trim()) {
      setFormError('Role is required');
      return false;
    }
    if (!formData.email.trim()) {
      setFormError('Email is required');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormSubmitting(true);
    
    try {
      // In a real application, this would send data to your backend
      await addMember(formData);
      
      setFormSuccess(true);
      // Reset form after successful submission
      setTimeout(() => {
        navigate('/members');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('Failed to add member. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="bg-indigo-600 py-4 px-6">
          <h1 className="text-xl font-bold text-white">Add New Team Member</h1>
        </div>
        
        {formSuccess ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Member Added Successfully!</h2>
            <p className="text-gray-600 mb-6">Redirecting to members list...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {formError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {formError}
              </div>
            )}
            
            <div className="space-y-4">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 relative rounded-full overflow-hidden bg-gray-100 mb-4 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={removeImage}
                        className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                
                <label htmlFor="profileImage" className="bg-indigo-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-indigo-700 transition duration-200 flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>{imagePreview ? 'Change Image' : 'Upload Image'}</span>
                </label>
                <input 
                  type="file" 
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden" 
                />
                <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF, max 2MB</p>
              </div>
              
              {/* Name & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>
              </div>
              
              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Brief description about the team member..."
                ></textarea>
              </div>
              
              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md mr-4 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={formSubmitting}
                className={`px-6 py-2 bg-indigo-600 text-white rounded-md shadow ${
                  formSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
                } transition`}
              >
                {formSubmitting ? 'Submitting...' : 'Add Member'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AddMemberPage;