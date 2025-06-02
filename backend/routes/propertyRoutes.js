const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// ✅ GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST a new property (used when admin adds from frontend)
router.post('/', async (req, res) => {
  const { title, location, price, image } = req.body;

  if (!title || !location || !price || !image) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newProperty = new Property({ title, location, price, image });
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save property" });
  }
});

module.exports = router;
