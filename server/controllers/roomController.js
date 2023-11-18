const roomModel = require('../models/roomModel');

const roomController = {
  getAllRooms: async (req, res) => {
    try {
      const rooms = await roomModel.getAllRooms();
      res.status(200).json(rooms);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getRoomByType: async (req, res) => {
    const roomType = req.params.roomType;

    try {
      const room = await roomModel.getRoomByType(roomType);

      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ error: 'Room not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = roomController;