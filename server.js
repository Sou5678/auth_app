const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Check if config/db.js exists, if not create inline connection
let connectDB;
try {
  connectDB = require('./config/db');
} catch (error) {
  console.log('config/db.js not found, using inline MongoDB connection...');
  const mongoose = require('mongoose');
  
  connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
  };
}

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});