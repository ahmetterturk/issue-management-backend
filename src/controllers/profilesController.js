const Profile = require('../models/profileModel');

// Get all profiles
const getProfiles = async (req, res) => {
  try {
    const allProfiles = await Profile.find();

    res.status(200).json(allProfiles);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Create profile
const createProfile = async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    const createdProfile = await newProfile.save();

    res.status(201).json(createdProfile);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get a profile
const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);

    if (!profile) {
      res.status(404).json(`Profile with id ${id} not found`);
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

// update profile
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const findProfile = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(id, findProfile, {
      new: true,
      overwrite: true,
      runValidator: true,
    });
    if (!findProfile) {
      res.status(404).json(`Profile with id ${id} not found`);
    }
    res.status(200).json(updatedProfile);
  } catch (error) {}
};

// delete profile
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (!deletedProfile) {
      res.status(404).json(`Profile with id ${id} not found`);
    }
    res.status(200).json({ msg: 'Profile has been deleted' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getProfiles,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
