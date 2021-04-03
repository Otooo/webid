'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authJwt = require("../src/middlewares/authMiddleware");

// const cors = require("cors");
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
  server.use(cookieParser());

  // test api
  router.get('/', (req, res) => {
    res.status(200)
    .send({
      status: 'running',
      prefix: 'api',
      version: "1.0.0"
    })
  })
  server.use('/', router);
  server.use('/api', router);

  // authentication
  server.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // loading routes
  const authRoute = require('../src/routes/authRoute');
  const itemRoute = require('../src/routes/itemRoute');
  const auctionRoute = require('../src/routes/auctionRoute');
  const bidbotRoute = require('../src/routes/bidbotRoute');
  const botSubscribeRoute = require('../src/routes/botSubscribeRoute');
  
  // registering routes
  server.use('/auth', authRoute);
  server.use('/api/items', [authJwt.verifyToken, authJwt.isAdmin], itemRoute);
  server.use('/api/auctions', [authJwt.verifyToken], auctionRoute);
  server.use('/api/bidbots', [authJwt.verifyToken, authJwt.isRegular], bidbotRoute);
  server.use('/api/botsubscribes', [authJwt.verifyToken, authJwt.isRegular], botSubscribeRoute);
}
