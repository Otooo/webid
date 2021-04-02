'use strict';

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
const uridb = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
// ?authSource=admin


module.exports = { uridb, options };
