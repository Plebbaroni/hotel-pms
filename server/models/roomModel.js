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
  
  
  getCheckoutRooms: async (req, res) => {
    return new Promise((resolve, reject) => {
      const query = `select * from room r
      inner join booking b
      on b.room_number = r.room_number
      and b.check_out_date = curdate()
      and b.is_active = 1`;
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

  getAvailableRooms: (type, quantity, checkInDate, checkOutDate) => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `
        SELECT r.room_number, r.room_type, rt.room_rate
        FROM Room r
        LEFT JOIN Booking b ON r.room_number = b.room_number
        JOIN Room_Type rt ON r.room_type = rt.room_type
        WHERE r.room_type = ? 
          AND r.room_status = 'Vacant'
          AND r.is_deleted != 1
          AND (
            b.is_active = 0
            OR (b.booking_id IS NULL)  -- Add this condition to include rooms without bookings
            OR (? >= b.check_out_date OR ? <= b.check_in_date)
          )
        LIMIT ?`;

        // Use parseInt to ensure quantity is treated as a number
        const results = await db.promise().query(query, [type, checkOutDate, checkInDate, parseInt(quantity, 10)]);
        resolve(results[0]); // Assuming the result is in the first element of the array
      } catch (error) {
        console.error('Error fetching available rooms:', error);
        reject(error);
      }
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

    updateOccupancy: async (newOcc, roomNumber) => {
      return new Promise((resolve, reject) => {
        const query = 'UPDATE room SET room_status = ? WHERE room_number = ?';
        db.query(query, [newOcc, roomNumber], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },
    
    getExpectedRooms: async () => {
      return new Promise((resolve, reject) => {
        const query = `UPDATE Room
        SET room_status = 'Expected Arrival'
        WHERE room_number IN (
            SELECT B.room_number
            FROM Booking B
            WHERE B.check_in_date = CURDATE()
            AND B.is_active = 1
            AND B.check_in_confirmed = 0
        )`;
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },

    getVacantRooms: async () => {
      return new Promise((resolve, reject) => {
        const query = `UPDATE Room
        SET room_status = 'Vacant'
        WHERE room_number NOT IN (SELECT DISTINCT room_number FROM Booking WHERE is_active = 1)`;
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },

    autoCheckOut: async () => {
      return new Promise((resolve, reject) => {
        const query = `UPDATE Booking
        SET is_active = 0
        WHERE check_out_date < CURDATE() AND is_active = 1`;
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    },

    getOccupiedRooms: async () => {
      return new Promise((resolve, reject) => {
        const query = `UPDATE Room
        SET room_status = 'Occupied'
        WHERE room_number IN (
            SELECT B.room_number
            FROM Booking B
            WHERE CURDATE() BETWEEN B.check_in_date AND B.check_out_date
                AND B.is_active = 1
                AND B.check_in_confirmed = 1
        )`;
        db.query(query, (err, result) => {
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