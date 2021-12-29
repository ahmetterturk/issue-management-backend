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

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json(`No message with id ${id}`);
    }
    const deletedMessage = await Message.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Message has been deleted', deletedMessage });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages, deleteMessage };
