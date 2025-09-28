const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://auth_app:demo1234@cluster0.xcngxah.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    
    // Fallback connection attempts
    console.log('Trying fallback connections...');
    
    const fallbackURIs = [
      'mongodb://localhost:27017/auth-app',
      'mongodb://127.0.0.1:27017/auth-app'
    ];
    
    for (let uri of fallbackURIs) {
      try {
        const fallbackConn = await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`Fallback MongoDB Connected: ${fallbackConn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.log(`Fallback failed for ${uri}`);
      }
    }
    
    console.error('All MongoDB connection attempts failed');
    process.exit(1);
  }
};

module.exports = connectDB;