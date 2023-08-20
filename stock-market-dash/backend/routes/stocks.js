const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocksController');

router.get('/realtime', stocksController.getRealTimeData);
router.get('/historical', stocksController.getHistoricalData);
router.get('/watchlist', stocksController.getWatchlist);

module.exports = router;
