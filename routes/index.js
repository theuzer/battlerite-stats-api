const express = require('express');

const statsController = require('../controllers/statsController');
const playerController = require('../controllers/playerController');

const characterController = require('../controllers/characterController');

const router = express.Router();

router.get('/stats', statsController.getStatsApi);
router.get('/player/exists', playerController.checkIfPlayerExistsApi);

module.exports = router;
