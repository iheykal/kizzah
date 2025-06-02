 
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  bedrooms: Number,
  bathrooms: Number,
  type: String,
  listingDate: Date,
  address: {
    street: String,
    city: String,
    region: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
