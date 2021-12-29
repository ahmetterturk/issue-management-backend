const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    messageBody: { type: String, required: true },
    issueId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
