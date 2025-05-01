const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Member Schema
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  bio: String,
  skills: [String],
  profileImage: String,
  joinDate: { type: Date, default: Date.now }
});

const Member = mongoose.model('Member', memberSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/members', upload.single('profileImage'), async (req, res) => {
  try {
    let imageUrl = '';
    
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'team_members',
        use_filename: true,
        unique_filename: false
      });
      
      imageUrl = result.secure_url;
    }

    const memberData = {
      ...req.body,
      profileImage: imageUrl,
      skills: req.body.skills ? req.body.skills.split(',').map(skill => skill.trim()) : []
    };

    const member = new Member(memberData);
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(400).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 