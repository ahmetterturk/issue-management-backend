// importing Message model
const Message = require('../models/messageModel');

// get all messages
const getMessages = async (req, res) => {
  try {
    // Get all messages with .find method from db
    const allMessages = await Message.find();
    // response 200 ok and return all messages as json format
    res.status(200).json(allMessages);
    // catch error if there is any and return 500 status with error in json format
  } catch (error) {
    res.status(500).json(error);
  }
};

// create message
const createMessage = async (req, res) => {
  try {
    // create newMessage and assign the request body to the new Message model
    const newMessage = new Message(req.body);
    // save the result
    const result = await newMessage.save();
    // return 201 status and retrun the created result as json format
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete message
const deleteMessage = async (req, res) => {
  try {
    // destructure the id from request params
    const { id } = req.params;
    // find message with findByIdAndDelete with current id and assign it to the deletedMessage
    const deletedMessage = await Message.findByIdAndDelete(id);
    // if there is no message with currrent id return 404 for not found with a msg: No message with id (current Id)
    if (!deletedMessage) {
      return res.status(404).json(`No message with id ${id}`);
    }
    // if there is response with 200 status and return msg and deletedMessage object as a json fromat
    res.status(200).json({ msg: 'Message has been deleted', deletedMessage });
  } catch (error) {
    res.status(500).json(error);
  }
};

// export all messages contoller
module.exports = { createMessage, getMessages, deleteMessage };
