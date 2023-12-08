
const db = require('../db')

const inventoryModel = {

    getAllItems: async (req, res) => {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * from inventory_item WHERE is_deleted = 0';
        db.query(query, (err, results) => {
          if(err){
            reject(err);
          }else{
            resolve(results);
          }
        })
      })
    },

    getAllItemsByTenant: async (tenant_id) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT
        io.item_quantity,
        io.item_price,
        ii.item_name
    FROM
        Inventory_Order io
    JOIN
        Inventory_Item ii ON io.item_id = ii.item_id
    JOIN
        Tenant t ON io.tenant_id = t.tenant_id
    WHERE
        io.tenant_id = ?;`;
        db.query(query, [tenant_id], (err, results) => {
          if(err){
            reject(err);
          }else{
            resolve(results);
          }
        })
      })
    },

    checkItemExists: async (itemname) => {
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM inventory_item WHERE item_name = ? AND is_deleted = 0', [itemname], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.length > 0);
            }
          });
        });
      },

      updateItem: async (id, updatedItemData) => {
        return new Promise((resolve, reject) => {
          const query = 'UPDATE inventory_item SET ? WHERE item_id = ?';
          db.query(query, [updatedItemData, id], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      },
    
      deleteItem: async (id) => {
        return new Promise((resolve, reject) => {
          const query = 'UPDATE inventory_item SET is_deleted = 1 WHERE item_id = ?'
          db.query(query, id, (err, result) =>{
            if(err){
              reject(err)
            }else{
              resolve(result)
            }
          })
        })
      },

    addItem: async (itemData) => {
        const {itemname, itemprice, itemquantity, isperishable} = itemData;
        console.log(itemname);
        return new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO inventory_item (item_name, item_quantity, item_price, is_perishable) VALUES (?, ?, ?, ?)",
            [itemname, itemprice, itemquantity, isperishable],
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
}
module.exports = inventoryModel;