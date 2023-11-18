const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();

router.get('/roomdata', roomController.getAllRooms);
router.get('/getRoomData/:roomType', roomController.getRoomByType);

module.exports = router;