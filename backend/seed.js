const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected. Inserting sample...");
    return Property.create({
      title: 'Modern 3-Bedroom Villa',
      location: 'KM4, Mogadishu',
      price: 350000,
      image: 'https://via.placeholder.com/400x300.png?text=Modern+Villa',
      bedrooms: 3,
      bathrooms: 2,
      listingDate: new Date(),
      address: {
        street: '123 Palm Street',
        city: 'Mogadishu',
        region: 'Banadir'
      },
      type: 'Villa'
    });
  })
  .then((result) => {
    console.log("✅ Sample inserted:", result);
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error inserting sample:", err);
    process.exit(1);
  });
