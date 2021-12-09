const router = require('express').Router();
const { createUser, signInUser } = require('../controllers/usersController');

router.route('/signup').post(createUser);
router.route('/signin').post(signInUser);

module.exports = router;
