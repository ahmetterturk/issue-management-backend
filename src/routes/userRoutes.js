const express = require('express');
// declare router and assing the express Router
const router = express.Router();
// importing all users controller
const {
  signIn,
  signUp,
  updateUser,
  deleteUser,
  allUsers,
  singleUser,
} = require('../controllers/usersController');
// importing uploadImage controller
const { uploadProfileImage } = require('../controllers/fileUploadController');
// importing authentication middleware
const auth = require('../middleware/auth');

// using get request to get all users
router.get('/', allUsers);
// using get request to get single user
router.get('/:id', singleUser);
// making post request to sign in
router.post('/signin', signIn);
// making post request to sign up
router.post('/signup', signUp);
// makign post request to upload image
router.post('/upload', uploadProfileImage);
// making patch request to update existing user with id, adding authentication middleware to authenticate first before updating
router.patch('/:id', auth, updateUser);
// making delete request to delete user with id, adding authentication middleware to authenticate first before deleting
router.delete('/:id', auth, deleteUser);

module.exports = router;
