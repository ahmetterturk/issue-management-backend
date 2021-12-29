const Message = require('../models/messageModel');

const getMessages = async (req, res) => {
  try {
    const allMessages = await Message.find();
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const result = await newMessage.save();

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages };