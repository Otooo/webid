'use strict';

const express = require('express');
const router = express.Router();

const bidbotController = require('../controllers/bidbotController');

router.get('/', bidbotController.show);
router.post('/', bidbotController.edit);

module.exports = router;
