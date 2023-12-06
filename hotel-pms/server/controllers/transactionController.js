const transactionModel = require('../models/transactionModel');

const transactionController = {

handleCheckOut: async (req, res) => {
    const roomNumber  = req.params.roomNumber; // Assuming roomNumber is passed in the request params
    
    try {
      const result = await transactionModel.handleCheckOut(roomNumber);
      res.status(200).json({ success: true, message: 'Check-out handled successfully.', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  },

}
module.exports = transactionController;