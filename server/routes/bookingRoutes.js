const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.get('/getBookingByUser/:userId', bookingController.getBookingByUser);

module.exports = router;