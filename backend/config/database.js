const mongoose = require('mongoose');

const {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD
} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// ${DB_USERNAME}:${DB_PASSWORD}@
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
// ?authSource=admin

mongoose.connect(url, options)
.then(result => {
  console.log('MongoDB connected!');
})
.catch(error => {
  console.log(error);
});
