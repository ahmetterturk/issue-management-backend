// importing mongoose from mongoose package
const mongoose = require('mongoose');
// creating a mongoose schema and passing the message properties
const messageSchema = mongoose.Schema(
  {
    messageBody: { type: String, required: true },
    issueId: { type: String, required: true },
    userName: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
// creating Message model with mongoose model and pass the messageSchema
const Message = mongoose.model('Message', messageSchema);

// export Message model
module.exports = Message;
