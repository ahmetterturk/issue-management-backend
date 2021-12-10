const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  city: String,
  street: String,
  streetNumber: Number,
});

const contactSchema = new mongoose.Schema({
  phone: Number,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: contactSchema,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
