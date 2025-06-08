const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: true
  },
  full: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Gallery', gallerySchema); 