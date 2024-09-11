const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChefSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialties: {
    type: [String], // Array of specialties
    default: [],
  },
  experience: {
    type: Number, // Years of experience
    default: 0,
  },
  profilePicture: {
    type: String, // Path to the profile picture
    default: ''
  },
  isApproved: {
    type: Boolean, // Indicates whether something is approved
    default: false
  }
});

module.exports = mongoose.model('Chef', ChefSchema);