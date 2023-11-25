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

  getAllRoomTypes: async (req, res) => {
    try {
      const rooms = await roomModel.getAllRoomTypes();
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