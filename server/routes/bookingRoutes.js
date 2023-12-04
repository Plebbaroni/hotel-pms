const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.get('/getBookingByUser/:userId', bookingController.getBookingByUser);
router.get('/getBookingByRoom/:roomNumber', bookingController.getBookingByRoom);
router.post('/createBooking', bookingController.createBooking);

module.exports = router;