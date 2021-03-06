const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  activeToken: {
    type: String,
  },
  activeTokenExpires: {
    type: Date,
    default: Date.now() + 24 * 3600 * 1000,
  },
});

module.exports = mongoose.model('User', userSchema);
