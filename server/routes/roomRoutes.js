const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();

router.get('/getHousekeeping', roomController.getHousekeeping);
router.get('/roomdata', roomController.getAllRoomTypes);
router.get('/getRoomData/:roomType', roomController.getRoomByType);
router.get('/getAllRooms', roomController.getAllRooms);
router.post('/addRoom', roomController.addRoom);

module.exports = router;