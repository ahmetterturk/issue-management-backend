const express = require('express');
const router = express.Router();
const {
  signIn,
  signUp,
  updateUser,
} = require('../controllers/usersController');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.patch('/:id', updateUser);

module.exports = router;
