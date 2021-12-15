const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    mobilePhone: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
