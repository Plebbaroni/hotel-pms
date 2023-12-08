const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();

router.get('/getHousekeeping', roomController.getHousekeeping);
router.get('/roomdata', roomController.getAllRoomTypes);
router.get('/getRoomData/:roomType', roomController.getRoomByType);
router.get('/getAllRooms', roomController.getAllRooms);
router.get('/getCheckoutRooms', roomController.getCheckoutRooms);
router.get('/getAvailableRooms/:type/:quantity/:checkInDate/:checkOutDate', roomController.getAvailableRooms);
router.post('/search', roomController.search)
router.post('/addRoom', roomController.addRoom);
router.put('/updateRoom/:roomNumber', roomController.updateRoom);
router.put('/deleteRoom/:roomNumber', roomController.deleteRoom);
router.put('/getExpectedRooms', roomController.getExpectedRooms);
router.put('/getOccupiedRooms', roomController.getOccupiedRooms);
router.put('/getVacantRooms', roomController.getVacantRooms);
router.put('/autoCheckOut', roomController.autoCheckOut);
router.put('/updateOccupancy', roomController.updateOccupancy);

module.exports = router;