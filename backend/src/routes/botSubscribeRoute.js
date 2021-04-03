'use strict';

const express = require('express');
const router = express.Router();

const botSubscribeController = require('../controllers/botSubscribeController');

router.get('/', botSubscribeController.show);
router.post('/', botSubscribeController.subscribe);
router.delete('/', botSubscribeController.unsubscribe);

module.exports = router;
