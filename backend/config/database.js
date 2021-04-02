const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { uridb, options } = require('./connectDB');

mongoose.connect(uridb, options)
.then(result => {
  console.log('MongoDB connected!');
})
.catch(error => {
  console.log(error);
});
