const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issuesController');

router.get('/', getIssues);
router.post('/', auth, createIssue);
router.get('/:id', auth, getIssue);
router.patch('/:id', auth, updateIssue);
router.delete('/:id', auth, deleteIssue);

module.exports = router;
