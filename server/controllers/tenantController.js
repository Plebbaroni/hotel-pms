const tenantModel = require('../models/tenantModel');

const tenantController = {
    createTenant: async (req, res) => {
        const tenantData = req.body;
      
        try {
          // Call the model function to create a booking
          const tenantId = await tenantModel.createTenant(tenantData);
      
          // Return success response with the created booking ID
          res.status(201).json(
              tenantId
            );
        } catch (error) {
          console.error('Error creating Tenant:', error);
      
          // Return error response
          res.status(500).json({
            message: 'Internal Server Error',
          });
        }
      },

      getTenantByBooking: async (req, res) => {
        const booking_id = req.booking_id;
        try{
            const tenant = await tenantModel.getTenantByBooking(booking_id);
            if(tenant){
              res.status(200).json(tenant)
            }else{
              res.status(404).json({error: 'internal server error'})
            }
        }catch(error){  
          console.error('JOEMAMA ERROR: ', error);
        }
      },


      getTenantByRoom: async (req, res) => {
        const roomNumber = req.params.roomNumber;
        console.log(roomNumber)
        try{
            const tenant = await tenantModel.getTenantByRoom(roomNumber);
            if(tenant){
              res.status(200).json(tenant)
            }else{
              res.status(404).json({error: 'internal server error'})
            }
        }catch(error){  
          console.error('JOEMAMA ERROR: ', error);
        }
      }
}

module.exports = tenantController;