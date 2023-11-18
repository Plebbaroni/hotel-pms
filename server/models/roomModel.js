const db = require('./db');

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
};

module.exports = roomModel;