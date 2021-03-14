const mongoose = require('mongoose');

const Room = new mongoose.Schema({
  p1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  p2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Room', Room);
