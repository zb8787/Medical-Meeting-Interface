const mongoose = require('mongoose');
const { Schema } = mongoose;

const Label = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  /**
   * @param completed {Boolean}
   * verify if the label appears in the file which converted from audio file uploaded.
   * --------------------------------------------------------------------------------
   * if (true) it appears
   * else not. <DEFAULT>
   * --------------------------------------------------------------------------------
   */
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  category: {
    type: String,
    default: '', // which is user created.
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const LabelModel = mongoose.model('Label', Label);
module.exports = LabelModel;