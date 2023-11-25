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