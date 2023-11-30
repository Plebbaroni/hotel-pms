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
    }
}

module.exports = bookingModel;