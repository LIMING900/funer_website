const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: true
  },
  contacts: [{
    icon: String,
    value: String
  }]
});

module.exports = mongoose.model('Agent', agentSchema); 