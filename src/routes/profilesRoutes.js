const express = require('express');
const router = express.Router();
const { uploadProfileImage } = require('../controllers/fileUploadController');
const {
  getProfiles,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profilesController');

router.route('/profiles').get(getProfiles).post(createProfile);

router
  .route('/profiles/:id')
  .get(getProfile)
  .patch(updateProfile)
  .delete(deleteProfile);

router.route('/profiles/upload').post(uploadProfileImage);

module.exports = router;
