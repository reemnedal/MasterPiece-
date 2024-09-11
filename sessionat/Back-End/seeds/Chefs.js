const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path if necessary
const Chef= require('../models/Chef'); // Adjust path if necessary

// Sample healthy Dish data
const chefs = new Chef({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    specialties: ['Italian', 'French'],
    experience: 5,
    profilePicture: 'http://example.com/profile.jpg',
    
  });
  
  chefs.save()
    .then(doc => console.log('Test Chef inserted:', doc))
    .catch(err => console.error('Error inserting test chef:', err));
  
const seedChefs = async () => {
  try {
    await connectDB(); // Connect to the database
    await Chef.deleteMany(); // Clear existing data
    const result = await Chef.insertMany(chefs); // Insert new data
    console.log('Healthy Dishes inserted:', result);
  } catch (error) {
    console.error('Error seeding Dishes:', error);
  } finally {
    mongoose.disconnect(); // Close the connection properly
  }
};

seedChefs();
