const express = require('express');
const router = express.Router();
const {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issuesController');

router.get('/', getIssues);
router.post('/', createIssue);
router.get('/:id', getIssue);
router.patch('/:id', updateIssue);
router.delete('/:id', deleteIssue);

module.exports = router;
