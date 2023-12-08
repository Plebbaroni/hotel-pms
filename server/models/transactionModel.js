const db = require('../db');

const transactionModel = {
    handleCheckOut: (roomNumber, tenantId) => {
        console.log(tenantId);
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
    
            const updateInventoryQuery = `
            UPDATE Inventory_Item ii
            JOIN Inventory_Order io ON ii.item_id = io.item_id
            SET ii.item_quantity = ii.item_quantity + io.item_quantity
            WHERE ii.is_perishable = 0 AND io.tenant_id = ?;
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
    
                        db.query(updateInventoryQuery, [tenantId], (err, inventoryResult) => {
                            if (err) {
                                db.rollback(() => reject(err));
                                return;
                            }
    
                            db.commit((err) => {
                                if (err) {
                                    db.rollback(() => reject(err));
                                } else {
                                    resolve({ roomResult, bookingResult, inventoryResult });
                                }
                            });
                        });
                    });
                });
            });
        });
    },

    handleInventoryOrder: (item_id, item_quantity, tenant_id) => {
        return new Promise((resolve, reject) => {
            const startTransaction = 'START TRANSACTION;';
            const calculatePriceQuery = `
                SELECT item_price * ? AS calculated_price FROM Inventory_Item WHERE item_id = ?;
            `;
    
            const checkQuantityQuery = 'SELECT item_quantity FROM Inventory_Item WHERE item_id = ?;';
            const insertOrderQuery = `
                INSERT INTO Inventory_Order (item_id, item_quantity, item_price, tenant_id)
                VALUES (?, ?, ?, ?);
            `;
            const updateItemQuantityQuery = `
                UPDATE Inventory_Item
                SET item_quantity = item_quantity - ?
                WHERE item_id = ?;
            `;
            const updateCheckoutBalanceQuery = `
                UPDATE Checkout_Balance
                SET current_balance = current_balance + ?,
                    number_of_orders = number_of_orders + 1
                WHERE tenant_id = ?;
            `;
            const commitTransaction = 'COMMIT;';
            const selectMessageQuery = 'SELECT "Transaction committed successfully." AS message;';
    
            db.beginTransaction((err) => {
                if (err) {
                    console.error('Error starting transaction:', err);
                    reject(err);
                    return;
                }
    
                // Start the transaction
                db.query(startTransaction, (err) => {
                    if (err) {
                        console.error('Error starting transaction:', err);
                        db.rollback(() => reject(err));
                        return;
                    }
    
                    // Calculate the price
                    db.query(calculatePriceQuery, [item_quantity, item_id], (err, result) => {
                        if (err) {
                            console.error('Error in calculatePriceQuery:', err);
                            db.query('ROLLBACK;', () => reject(err));
                            return;
                        }
    
                        // Check if the result array and its first element are defined
                        if (result && result[0] && result[0].calculated_price !== undefined) {
                            const calculated_price = result[0].calculated_price;
    
                            // Log the calculated price
                            console.log('Calculated Price:', calculated_price);
    
                            // Check the current quantity
                            db.query(checkQuantityQuery, [item_id], (err, result) => {
                                if (err) {
                                    console.error('Error in checkQuantityQuery:', err);
                                    db.rollback(() => reject(err));
                                    return;
                                }
    
                                // Log the result for debugging
                                console.log('Result of checkQuantityQuery:', result);
    
                                // Check if the result array and its first element are defined
                                if (result && result[0] && result[0].item_quantity !== undefined) {
                                    const currentQuantity = result[0].item_quantity;
    
                                    // Log the current quantity
                                    console.log('Current Quantity:', currentQuantity);
    
                                    // Check if the quantity is sufficient
                                    if (currentQuantity >= item_quantity) {
                                        // Proceed with the order
                                        db.query(insertOrderQuery, [item_id, item_quantity, calculated_price, tenant_id], (err) => {
                                            if (err) {
                                                console.error('Error in insertOrderQuery:', err);
                                                db.rollback(() => reject(err));
                                                return;
                                            }
    
                                            // Update item quantity
                                            db.query(updateItemQuantityQuery, [item_quantity, item_id], (err) => {
                                                if (err) {
                                                    console.error('Error in updateItemQuantityQuery:', err);
                                                    db.rollback(() => reject(err));
                                                    return;
                                                }
    
                                                // Update checkout balance
                                                db.query(updateCheckoutBalanceQuery, [calculated_price, tenant_id], (err) => {
                                                    if (err) {
                                                        console.error('Error in updateCheckoutBalanceQuery:', err);
                                                        db.rollback(() => reject(err));
                                                        return;
                                                    }
    
                                                    // Commit the transaction
                                                    db.query(commitTransaction, (err) => {
                                                        if (err) {
                                                            console.error('Error in commitTransaction:', err);
                                                            db.rollback(() => reject(err));
                                                        } else {
                                                            console.log('Transaction committed successfully.');
                                                            // Resolve with the success message
                                                            resolve({ message: 'Transaction committed successfully.' });
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    } else {
                                        // Rollback if quantity is insufficient
                                        console.error('Insufficient quantity.');
                                        db.query('ROLLBACK;', () => {
                                            reject('Insufficient quantity.');
                                        });
                                    }
                                } else {
                                    // Rollback if the result is not as expected or is undefined
                                    console.error('Error fetching current quantity.');
                                    db.query('ROLLBACK;', () => {
                                        reject('Error fetching current quantity.');
                                    });
                                }
                            });
                        } else {
                            // Rollback if the result is not as expected or is undefined
                            console.error('Error fetching calculated price.');
                            db.query('ROLLBACK;', () => {
                                reject('Error fetching calculated price.');
                            });
                        }
                    });
                });
            });
        });
    }
}
module.exports = transactionModel;