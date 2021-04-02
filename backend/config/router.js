'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

module.exports = function (server) {
  // configure request/response
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

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
  const itemRoute = require('../src/routes/itemRoute');
  
  // registering routes
  server.use('/api/items', itemRoute);
}
