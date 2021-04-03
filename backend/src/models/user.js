const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }],
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema, 'users');
