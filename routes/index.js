const express = require('express');

const statsController = require('../controllers/statsController');
const characterController = require('../controllers/characterController');

const router = express.Router();

router.get('/stats', statsController.getStatsApi);
router.get('/player/exists', characterController.getPlayer);

module.exports = router;
