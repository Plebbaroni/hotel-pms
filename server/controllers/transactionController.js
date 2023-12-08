const transactionModel = require('../models/transactionModel');

const transactionController = {

handleCheckOut: async (req, res) => {
    const roomNumber  = req.params.roomNumber; // Assuming roomNumber is passed in the request params
    const tenantId =req.body.tenant_id
    console.log(tenantId);
    try {
      const result = await transactionModel.handleCheckOut(roomNumber, tenantId);
      res.status(200).json({ success: true, message: 'Check-out handled successfully.', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  },

  handleInventoryOrder: async (req, res) => {
    const { item_id, item_quantity, tenant_id } = req.body; // Assuming the parameters are sent in the request body

    try {
      const result = await transactionModel.handleInventoryOrder(item_id, item_quantity, tenant_id);
      res.status(200).json({ success: true, message: 'Inventory order handled successfully.', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  }
}
module.exports = transactionController;