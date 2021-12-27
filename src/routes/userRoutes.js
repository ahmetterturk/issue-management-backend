const express = require('express');
const router = express.Router();
const {
  signIn,
  signUp,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
