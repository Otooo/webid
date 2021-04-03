const mongoose = require('mongoose');
const { Schema } = mongoose;

const bidbotSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  active: {
    type: Boolean,
    default: false
  },
  max_bid: {
    type: Number,
    default: 0
  },
  current_bid: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bidbot', bidbotSchema, 'bidbots');
