const db = require('../db');

const transactionModel = {
    handleCheckOut: (roomNumber) => {
        return new Promise((resolve, reject) => {
            const updateRoomQuery = `
                UPDATE Room
                SET room_status = 'Vacant'
                WHERE room_number = ?;
            `;
    
            const updateBookingQuery = `
                UPDATE Booking
                SET is_active = 0
                WHERE room_number = ?;
            `;
    
            db.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }
    
                db.query(updateRoomQuery, [roomNumber], (err, roomResult) => {
                    if (err) {
                        db.rollback(() => reject(err));
                        return;
                    }
    
                    db.query(updateBookingQuery, [roomNumber], (err, bookingResult) => {
                        if (err) {
                            db.rollback(() => reject(err));
                            return;
                        }
    
                        db.commit((err) => {
                            if (err) {
                                db.rollback(() => reject(err));
                            } else {
                                resolve({ roomResult, bookingResult });
                            }
                        });
                    });
                });
            });
        });
    },
}
module.exports = transactionModel;