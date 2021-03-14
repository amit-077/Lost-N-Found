const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
  chatMessage: {
    type: String,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  senderName: {
    type: String,
  },
  senderEmail: {
    type: String,
  },
  type: {
    type: String,
  },
  grpMsg: {
    type: Boolean,
    default: false
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  grpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
}, {timestamps: true});

module.exports = mongoose.model('Chat', Chat);
