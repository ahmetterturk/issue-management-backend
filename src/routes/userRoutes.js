const router = require('express').Router();
const { createUser } = require('../controllers/userController');

router.route('/signup').post(createUser);

module.exports = router;
