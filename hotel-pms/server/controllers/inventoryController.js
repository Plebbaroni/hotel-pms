const inventoryModel = require('../models/inventoryModel');

const inventoryController = {

    getAllItems: async (req, res) => {
        try{
            const items = await inventoryModel.getAllItems();
            res.status(200).json(items);
        }catch(error){
            console.error('Error: ', error);
            res.status(500).json({error: 'Internal server error'});
        }
    },

    updateItem: async (req, res) => {
        const itemId = req.params.id; 
        const updatedItemData = req.body;
    
        try {
          const result = await inventoryModel.updateItem(itemId, updatedItemData);
    
          if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Item updated successfully' });
          } else {
            res.status(404).json({ message: 'Item not found' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    
      deleteItem: async (req, res) => {
        const itemId = req.params.id; 
    
        try {
          const result = await inventoryModel.deleteItem(itemId);
    
          if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
          } else {
            res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

    addItem: async (req, res) => {
        const{itemname, itemprice, itemquantity, isperishable} = req.body;
        try{
            const itemExists = await inventoryModel.checkItemExists(itemname);
            if(itemExists){
                res.status(409).send('Item already exists');
            }else{
                await inventoryModel.addItem({
                    itemname,
                    itemprice,
                    itemquantity,
                    isperishable
                });
                res.status(201).send('Item Added!');
            }
        }catch(error){
            console.error('Error:', error);
            res.status(500).send('Internal Server Error')
        }
    },
}
module.exports = inventoryController;