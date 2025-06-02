const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/realestate');
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
connectDB();

// Property Model
const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  bedrooms: { type: Number, default: 1, min: 1 },
  bathrooms: { type: Number, default: 1, min: 1 },
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', PropertySchema);

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: '✅ API is running',
    endpoints: {
      properties: '/api/properties',
      health: '/api/health'
    }
  });
});

app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    console.error('GET /api/properties error:', err);
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
});

app.post('/api/properties', async (req, res) => {
  const { title, location, price, image, adminPassword } = req.body;
  const validPassword = process.env.ADMIN_PASSWORD || '123'; // Fallback for development

  // Validation
  if (!title || !location || !price || !image || !adminPassword) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Security check
  if (adminPassword !== validPassword) {
    return res.status(403).json({ message: '❌ Unauthorized: Invalid admin password' });
  }

  try {
    const newProperty = new Property({ 
      title: title.trim(),
      location: location.trim(),
      price: Number(price),
      image: image.trim(),
      ...req.body // Include other valid fields
    });
    
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    console.error('POST /api/properties error:', err);
    res.status(500).json({ message: 'Failed to create property' });
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Access the API at http://localhost:${PORT}/api`);
});