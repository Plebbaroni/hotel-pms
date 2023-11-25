
const db = require('../db')

const inventoryModel = {

    getAllItems: async (req, res) => {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * from inventory_item';
        db.query(query, (err, results) => {
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
          db.query('SELECT * FROM inventory_item WHERE item_name = ?', [itemname], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.length > 0);
            }
          });
        });
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