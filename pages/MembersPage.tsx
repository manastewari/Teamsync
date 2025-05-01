import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Mail, Phone } from 'lucide-react';
import { Member } from '../types';
import { getAllMembers } from '../services/api';

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllMembers();
        setMembers(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load team members. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMembers();
  }, []);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-indigo-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-indigo-100 rounded-md"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Members</h1>
          <p className="text-gray-600">{members.length} members in the team</p>
        </div>
        
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search members..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      {filteredMembers.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No members found</h2>
          <p className="text-gray-500 mb-6">Try adjusting your search or add a new team member</p>
          <Link 
            to="/add-member"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Add New Member
          </Link>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredMembers.map((member) => (
            <MemberCard key={member._id} member={member} itemVariant={item} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

interface MemberCardProps {
  member: Member;
  itemVariant: {
    hidden: { opacity: number; y: number };
    show: { opacity: number; y: number; transition: { duration: number } };
  };
}

const MemberCard: React.FC<MemberCardProps> = ({ member, itemVariant }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      variants={itemVariant}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 mr-4 rounded-full overflow-hidden bg-indigo-100 flex-shrink-0">
            {member.profileImage ? (
              <img 
                src={member.profileImage} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-xl">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
            <p className="text-indigo-600">{member.role}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm truncate">{member.email}</span>
          </div>
          
          {member.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{member.phone}</span>
            </div>
          )}
        </div>
        
        {member.skills && member.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {typeof member.skills === 'string' 
                ? member.skills.split(',').map((skill, index) => (
                    <span key={index} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">
                      {skill.trim()}
                    </span>
                  ))
                : member.skills.map((skill, index) => (
                    <span key={index} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))
              }
            </div>
          </div>
        )}
        
        <Link 
          to={`/members/${member._id}`}
          className="flex items-center justify-center w-full py-2 mt-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors"
        >
          <span>View Details</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default MembersPage;