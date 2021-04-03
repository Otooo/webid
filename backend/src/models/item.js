const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image: {
    data: Buffer,
    contentType: String
  },
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema, 'items');
