const mongoose = require('mongoose');

const { Schema } = mongoose;

const Audio = new Schema({
  path: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const AudioModel = mongoose.model('Audio', Audio);

module.exports = AudioModel;