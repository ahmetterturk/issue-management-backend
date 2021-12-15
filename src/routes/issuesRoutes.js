const express = require('express');
const router = express.Router();
const {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issuesController');

router.route('/').get(getIssues).post(createIssue);
router.route('/:id').get(getIssue).patch(updateIssue).delete(deleteIssue);

module.exports = router;
