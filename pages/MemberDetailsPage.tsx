import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Member } from '../types';
import { getMemberById } from '../services/api';

const MemberDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        if (id) {
          const memberData = await getMemberById(id);
          setMember(memberData);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching member details:', err);
        setError('Failed to load member details. Please try again later.');
        setLoading(false);
      }
    };
    
    if (id) {
      fetchMemberDetails();
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-20 w-20 bg-indigo-200 rounded-full mb-4"></div>
          <div className="h-4 w-40 bg-indigo-100 rounded mb-3"></div>
          <div className="h-4 w-60 bg-indigo-50 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error || !member) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <div className="text-red-500 mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {error || 'Member not found'}
        </h2>
        <p className="text-gray-600 mb-6">We couldn't find the team member you're looking for.</p>
        <Link 
          to="/members"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Members
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/members')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Members</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-indigo-800">
          <div className="absolute -bottom-16 left-8">
            <motion.div 
              className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {member.profileImage ? (
                <img 
                  src={member.profileImage} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-3xl">
                  {member.name.charAt(0)}
                </div>
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="pt-20 px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-800">{member.name}</h1>
            <p className="text-xl text-indigo-600 mb-6">{member.role}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-8">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-800">{member.email}</p>
                </div>
              </div>
              
              {member.phone && (
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-gray-800">{member.phone}</p>
                  </div>
                </div>
              )}
              
              {member.joinDate && (
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Join Date</h3>
                    <p className="text-gray-800">{member.joinDate}</p>
                  </div>
                </div>
              )}
            </div>
            
            {member.bio && (
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Bio</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            )}
            
            {member.skills && member.skills.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {typeof member.skills === 'string' 
                    ? member.skills.split(',').map((skill: string, index: number) => (
                        <span key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                          {skill.trim()}
                        </span>
                      ))
                    : member.skills.map((skill: string, index: number) => (
                        <span key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))
                  }
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;