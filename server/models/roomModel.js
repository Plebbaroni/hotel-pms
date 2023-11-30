const db = require('../db');

const roomModel = {

  getHousekeeping: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM room WHERE room_status = "Needs Maintenance" AND is_deleted = 0';
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getAllRooms: async (req, res) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * from room WHERE is_deleted = 0';
      db.query(query, (err, results) => {
        if(err){
          reject(err);
        }else{
          resolve(results);
        }
      })
    })
  },
  
  
  getAllRooms: async (req, res) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * from room WHERE is_deleted = 0';
      db.query(query, (err, results) => {
        if(err){
          reject(err);
        }else{
          resolve(results);
        }
      })
    })
  },

  getAllRoomTypes: async () => {
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

  search: async (searchParams) => {
    if(searchParams.adults === ''){
      searchParams.adults = 0;
    }
    if(searchParams.children === ''){
      searchParams.children = 0;
    }
    
    const totalUsers = parseInt(searchParams.adults) + parseInt(searchParams.children)
    console.log(totalUsers);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Room_Type where ? <= max_number_of_occupants`;
      db.query(query, totalUsers, (err, results) => {
        if(err){
          reject(err);
        }else{
          resolve(results);
        }
      })
    })
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
        db.query('SELECT * FROM room WHERE room_number = ? AND is_deleted = 0', [room_number], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.length > 0);
          }
        });
      });
    },

    updateRoom: async (roomNumber, updatedRoomData) => {
      return new Promise((resolve, reject) => {
        const query = 'UPDATE room SET ? WHERE room_number = ?';
        db.query(query, [updatedRoomData, roomNumber], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
  
    deleteRoom: async (roomNumber) => {
      return new Promise((resolve, reject) => {
        const query = 'UPDATE room SET is_deleted = 1 WHERE room_number = ?'
        db.query(query, roomNumber, (err, result) =>{
          if(err){
            reject(err)
          }else{
            resolve(result)
          }
        })
      })
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