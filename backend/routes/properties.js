const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// ✅ GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ date: -1 }); // Newest first
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST a new property (admin creates listing)
router.post('/', async (req, res) => {
  const { title, location, price, image } = req.body;

  // Basic input validation
  if (!title || !location || !price || !image) {
    return res.status(400).json({ message: "❌ Missing required fields" });
  }

  try {
    const newProperty = new Property({
      title: title.trim(),
      location: location.trim(),
      price: Number(price),
      image: image.trim()
    });

    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Failed to save property:", err);
    res.status(500).json({ message: '❌ Failed to save property' });
  }
});

module.exports = router;
