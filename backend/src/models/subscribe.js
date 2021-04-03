const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscribeSchema = new Schema({
  bidbot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bidbot"
  },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction"
  }
});

module.exports = mongoose.model('Subscribe', subscribeSchema, 'subscribes');
