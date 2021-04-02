'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cors = require("cors");
const router = express.Router();

module.exports = function (server) {
  // configure cors
  // const corsOptions = {
  //   origin: "http://localhost:8080"
  // };
  // server.use(cors(corsOptions));
  
  // configure parsers
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  // server.use(cookieParser());

  // test api
  router.get('/', (req, res, next) => {
    res.status(200)
    .send({
      status: 'running',
      prefix: 'api',
      version: "1.0.0"
    })
  })
  server.use('/', router);
  server.use('/api', router);

  // loading routes
  const authRoute = require('../src/routes/authRoute');
  const itemRoute = require('../src/routes/itemRoute');
  
  // registering routes
  server.use('/auth', authRoute);
  server.use('/api/items', itemRoute);
}
