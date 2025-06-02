import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  image: String, // URL of the image
  date: {
    type: Date,
    default: Date.now
  }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
