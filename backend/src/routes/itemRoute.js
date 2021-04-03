'use strict';

const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/', itemController.index);
router.post('/', itemController.store);

module.exports = router;

