const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  type: {
    type: String,
  },
  priority: {
    type: String,
    enum: { values: ['Low', 'High'], message: '{VALUE} is not supported' },
  },
  status: {
    type: String,
    enum: {
      values: ['New', 'Pending', 'Resolved'],
      message: '{VALUE} is not supported',
    },
    default: 'New',
  },
  members: {
    type: Array,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
