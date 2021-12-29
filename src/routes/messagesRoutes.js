const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const {
  getMessages,
  createMessage,
  deleteMessage,
} = require('../controllers/messagesController');

router.get('/', getMessages);
router.post('/', createMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
