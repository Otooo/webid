const mongoose = require('mongoose');
const { Schema } = mongoose;

const auctionSchema = new Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  start_bid: {
    type: Number,
    require: true
  },
  current_bid: {
    type: Number
  },
  status: {
    type: String,
    default: 'closed'
  },
  opened_at: {
    type: Date
  },
  closed_at: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Auction', auctionSchema, 'auction');
