const Profile = require('../models/profileModel');

const getProfiles = async (req, res) => {
  try {
    const allProfiles = await Profile.find();

    res.status(200).json(allProfiles);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createProfile = async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    const createdProfile = await newProfile.save();

    res.status(201).json(createdProfile);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getProfiles,
  createProfile,
};
