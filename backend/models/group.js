const mongoose = require('mongoose');

const Group = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  pic: {
    type: String,
    default: '',
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Group', Group);
