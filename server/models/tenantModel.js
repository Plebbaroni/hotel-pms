const db = require('../db');

const tenantModel = {
    createTenant: async (tenantData) => {
        return new Promise(async (resolve, reject) => {
            const {
                first_name,
                last_name,
                booking_id,
            } = tenantData;
    
            try {
                // Update room status in the Room table to 'Occupied'
                await db.promise().query(
                    `UPDATE Room
                     SET room_status = 'Occupied'
                     WHERE room_number = (
                        SELECT room_number
                        FROM Booking
                        WHERE booking_id = ?
                     )`,
                    [booking_id]
                );
    
                // Update check_in_confirmed in the Booking table
                await db.promise().query(
                    `UPDATE Booking
                     SET check_in_confirmed = 1
                     WHERE booking_id = ?`,
                    [booking_id]
                );
    
                // Insert the tenant data into the Tenant table
                const [tenantResult] = await db.promise().query(
                    `INSERT INTO tenant (
                        first_name,
                        last_name,
                        booking_id
                    ) VALUES (?, ?, ?)`,
                    [
                        first_name,
                        last_name,
                        booking_id,
                    ]
                );
    
                // Get the newly created tenant_id
                const tenantId = tenantResult.insertId;
    
                // Insert data into the Checkout_Balance table
                const [checkoutBalanceResult] = await db.promise().query(
                    `INSERT INTO Checkout_Balance (
                        current_balance,
                        number_of_orders,
                        tenant_id
                    ) VALUES (?, ?, ?)`,
                    [
                        0,  // Set an initial value for current_balance
                        0,  // Set an initial value for number_of_orders
                        tenantId,  // Use the tenant_id as the foreign key
                    ]
                );
    
                // Fetch the complete tenant data along with Checkout_Balance
                const [completeTenantData] = await db.promise().query(
                    `SELECT t.*, cb.current_balance, cb.number_of_orders
                     FROM tenant t
                     JOIN Checkout_Balance cb ON t.tenant_id = cb.tenant_id
                     WHERE t.tenant_id = ?`,
                    [tenantId]
                );
    
                // Resolve with the complete tenant data
                resolve(completeTenantData[0]);
            } catch (error) {
                // Reject with the error to be caught by the controller
                reject(error);
            }
        });
    },


    /*getTenantByBooking: async (booking_id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM  tenant t
            INNER JOIN booking b
            ON t.booking_id = ?`
            db.query(query, booking_id, (err, results) => {
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })
        })
    },*/

          getTenantByRoom: async (roomNumber) => {
            return new Promise((resolve, reject) => {
                const query = `SELECT t.*
                FROM Room r INNER JOIN Booking b
                ON b.room_number = r.room_number
                INNER JOIN tenant t 
                ON t.booking_id = b.booking_id
                WHERE CURDATE() BETWEEN b.check_in_date and b.check_out_date
                  AND b.is_active = 1
                  AND b.check_in_confirmed = 1
                  AND b.room_number = ?
                  LIMIT 1;`
                db.query(query, [roomNumber], (err, results) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                })
            })
        }
        
}
module.exports = tenantModel;