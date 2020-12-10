const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  // doctor-0 or patient-1
  category: {
    type: Number,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model('User', User);

module.exports = UserModel;