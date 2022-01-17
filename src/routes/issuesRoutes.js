const express = require('express');
// declare router and assign it to express Router
const router = express.Router();
// import authentcation middlware
const auth = require('../middleware/auth');
// import all issues controller
const {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issuesController');

// making a get request to fetch all issues from DB
router.get('/', getIssues);
// making a post request to create an issue and pass auth middleware to authenticate the user before creating an issue
router.post('/', auth, createIssue);
// making a ger request to fetch single issue and pass auth middleware to aithenticate  user before fetching an issues
router.get('/:id', auth, getIssue);
// making patch request to update existing issue and pass auth middleware to authenticate user before updating an issue
router.patch('/:id', auth, updateIssue);
// making delete request to delete issue and passing auth middleware to autheticate user before deleting an issue
router.delete('/:id', auth, deleteIssue);

module.exports = router;
