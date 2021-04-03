'use strict';

const express = require('express');
const router = express.Router();
const authJwt = require("../middlewares/authMiddleware");

const auctionController = require('../controllers/auctionController');

router.get('/', auctionController.index);
router.put('/:id', auctionController.edit);
router.post('/', [authJwt.isAdmin], auctionController.store);

module.exports = router;

