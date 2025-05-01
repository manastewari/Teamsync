import axios from 'axios';
import { Member, AddMemberFormData } from '../types';

// Base URL for API endpoints
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Service to get all members
export const getAllMembers = async (): Promise<Member[]> => {
  try {
    const response = await api.get('/members');
    return response.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

// Service to get a specific member by ID
export const getMemberById = async (id: string): Promise<Member> => {
  try {
    const response = await api.get(`/members/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching member with ID ${id}:`, error);
    throw error;
  }
};

// Service to add a new member
export const addMember = async (memberData: AddMemberFormData): Promise<Member> => {
  try {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('name', memberData.name);
    formData.append('role', memberData.role);
    formData.append('email', memberData.email);
    formData.append('phone', memberData.phone);
    formData.append('bio', memberData.bio);
    formData.append('skills', memberData.skills);
    
    if (memberData.profileImage) {
      formData.append('profileImage', memberData.profileImage);
    }

    const response = await api.post('/members', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error adding new member:', error);
    throw error;
  }
};

// Mock data for development (will be removed when backend is connected)
export const getMockMembers = (): Member[] => {
  return [
    {
      _id: '1',
      name: 'Alex Johnson',
      role: 'Team Lead',
      email: 'alex@example.com',
      phone: '555-123-4567',
      bio: 'Experienced team leader with 5 years in software development.',
      skills: ['React', 'Node.js', 'MongoDB'],
      profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      joinDate: '2023-01-15'
    },
    {
      _id: '2',
      name: 'Sarah Chen',
      role: 'Frontend Developer',
      email: 'sarah@example.com',
      phone: '555-987-6543',
      bio: 'Specialized in creating beautiful, responsive user interfaces.',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      joinDate: '2023-02-20'
    },
    {
      _id: '3',
      name: 'Michael Rodriguez',
      role: 'Backend Developer',
      email: 'michael@example.com',
      phone: '555-456-7890',
      bio: 'Passionate about building scalable backend systems.',
      skills: ['Node.js', 'Express', 'MongoDB'],
      profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
      joinDate: '2023-03-10'
    }
  ];
};