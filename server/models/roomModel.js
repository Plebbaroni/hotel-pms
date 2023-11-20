const db = require('../db');

const roomModel = {
  getAllRooms: async () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Room_Type';
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getRoomByType: async (roomType) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Room_Type WHERE room_type = ?`;
      db.query(query, [roomType], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

    checkRoomExists: async (room_number) => {
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM room WHERE room_number = ?', [room_number], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.length > 0);
          }
        });
      });
    },

    addRoom: async (roomData) => {
      const {roomnumber, roomfloor, roomtype} = roomData;
      console.log(roomfloor)
      return new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO room (room_number, floor_number, room_type) VALUES (?, ?, ?)",
          [roomnumber, roomfloor, roomtype],
          (err, result) => {
            if(err){
              reject(err)
            }else{
              resolve(result);
            }
          }
        )
      })
    }
};

module.exports = roomModel;