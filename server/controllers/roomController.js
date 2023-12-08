const roomModel = require('../models/roomModel');

const roomController = {
  
    getHousekeeping: async (req, res) => {
      try {
        const rooms = await roomModel.getHousekeeping();
        res.status(200).json(rooms);
      } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    getAllRooms: async (req, res) => {
      try {
        const rooms = await roomModel.getAllRooms();
        res.status(200).json(rooms);
      } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    getExpectedRooms: async (req, res) => {
      try {
        const rooms = await roomModel.getExpectedRooms();
        res.status(200).json(rooms);
      } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    getVacantRooms: async (req, res) => {
      try {
        const rooms = await roomModel.getVacantRooms();
        res.status(200).json(rooms);
      } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    autoCheckOut: async (req, res) => {
      try {
        const rooms = await roomModel.autoCheckOut();
        res.status(200).json(rooms);
      } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    getOccupiedRooms: async (req, res) => {
      try {
        const rooms = await roomModel.getOccupiedRooms();
        res.status(200).json(rooms);
      } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      
    },
  getAllRoomTypes: async (req, res) => {
    try {
      const rooms = await roomModel.getAllRoomTypes();
      res.status(200).json(rooms);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  search: async (req, res) => {
    const searchParams = req.body;
    try {
      const rooms = await roomModel.search(searchParams);
      res.status(200).json(rooms);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateRoom: async (req, res) => {
    const roomNumber = req.params.roomNumber; 
    const updatedRoomData = req.body;

    try {
      const result = await roomModel.updateRoom(roomNumber, updatedRoomData);

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteRoom: async (req, res) => {
    const roomNumber = req.params.roomNumber; 

    try {
      const result = await roomModel.deleteRoom(roomNumber);

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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

  getAvailableRooms: async (req, res) => {
    try {
      const { type, quantity, checkInDate, checkOutDate } = req.params;
      const availableRooms = await roomModel.getAvailableRooms(type, quantity, checkInDate, checkOutDate);
      res.status(200).json(availableRooms);
    } catch (error) {
      console.error('Error: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  addRoom: async (req, res) => {
    const{roomnumber, roomfloor, roomtype} = req.body;
    try{
      const roomExists = await roomModel.checkRoomExists(roomnumber);
      if(roomExists){
        res.status(409).send('Room already exists');
      }else{
        console.log(req.body)
        await roomModel.addRoom({
          roomnumber,
          roomfloor,
          roomtype
        });
        res.status(201).send('Room added!');
      }
    }catch(error){
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = roomController;