const db = require('../db')

const bookingModel = {

    getBookingByUser: async (userId) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT
            b.booking_id,
            b.is_active,
            DATE_FORMAT(b.check_in_date, '%Y-%m-%d') AS check_in,
            DATE_FORMAT(b.check_out_date, '%Y-%m-%d') AS check_out,
            r.room_type,
            rt.room_rate
        FROM
            Booking b
        JOIN
            Room r ON b.room_number = r.room_number
        JOIN
            Room_Type rt ON r.room_type = rt.room_type
        WHERE
            b.user_id = ?;`;
            db.query(query, userId, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },

    getBookingByRoom: async (roomNumber) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT *
        FROM Booking
        WHERE CURDATE() = check_in_date
          AND room_number = ?
          AND is_active = 1`;
            db.query(query, roomNumber, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },

    

    createBooking: async (bookingData) => {
        return new Promise(async (resolve, reject) => {
          const {
            room_number,
            number_of_guests_adult,
            number_of_guests_children,
            first_name,
            last_name,
            check_in_date,
            check_out_date,
            user_id,
            country,
            phone_number,
            email
          } = bookingData;
      
          try {
            // Insert the booking data into the Booking table
            const [result] = await db.promise().query(
              `INSERT INTO Booking (
                room_number,
                number_of_guests_adult,
                number_of_guests_children,
                first_name,
                last_name,
                check_in_date,
                check_out_date,
                user_id,
                country,
                phone_number,
                email
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                room_number,
                number_of_guests_adult,
                number_of_guests_children,
                first_name,
                last_name,
                check_in_date,
                check_out_date,
                user_id,
                country,
                phone_number,
                email
              ]
            );
      
            // Resolve with the booking ID of the newly created record
            resolve(result.insertId);
          } catch (error) {
            // Reject with the error to be caught by the controller
            reject(error);
          }
        });
      },

      cancelBooking: (booking_id) => {
        return new Promise((resolve, reject) => {
          const query = `UPDATE Booking
          SET is_active = 0
          WHERE booking_id = ?
            AND check_in_confirmed = 0;`;
          db.query(query, booking_id, (err, results)=>{
            if(err){
              console.log(err)
              reject(err)
            }else{
              resolve(results)
            }
          })
        })
      }
}

module.exports = bookingModel;