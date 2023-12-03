const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();

router.get('/getHousekeeping', roomController.getHousekeeping);
router.get('/roomdata', roomController.getAllRoomTypes);
router.get('/getRoomData/:roomType', roomController.getRoomByType);
router.get('/getAllRooms', roomController.getAllRooms);
router.get('/getAvailableRooms/:type/:quantity/:checkInDate/:checkOutDate', roomController.getAvailableRooms);
router.post('/search', roomController.search)
router.post('/addRoom', roomController.addRoom);
router.put('/updateRoom/:roomNumber', roomController.updateRoom);
router.put('/deleteRoom/:roomNumber', roomController.deleteRoom);

module.exports = router;