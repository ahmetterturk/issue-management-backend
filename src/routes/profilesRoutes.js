const express = require('express');
const router = express.Router();
const {
  getProfiles,
  createProfile,
} = require('../controllers/profilesController');

router.route('/profiles').get(getProfiles).post(createProfile);

module.exports = router;
