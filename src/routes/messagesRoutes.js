const express = require('express');
// declare router and assign it to express Router
const router = express.Router();
// import all messages controller
const {
  getMessages,
  createMessage,
  deleteMessage,
} = require('../controllers/messagesController');
// make a get request to fetch all messages from DB
router.get('/', getMessages);
// make a post request to create a new message
router.post('/', createMessage);
// make a delete request to delete a message with specific id
router.delete('/:id', deleteMessage);
// export router 
module.exports = router;
