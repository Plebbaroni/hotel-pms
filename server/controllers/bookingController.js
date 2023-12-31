const bookingModel = require('../models/bookingModel');

const bookingController = {
    getBookingByUser: async (req, res) => {
        try {
            const userId = req.params.userId; // Get user ID from request parameters
            const bookings = await bookingModel.getBookingByUser(userId);
            res.status(200).json(bookings);
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getBookingByRoom: async (req, res) => {
      try {
          const roomNumber = req.params.roomNumber; // Get user ID from request parameters
          const booking = await bookingModel.getBookingByRoom(roomNumber);
          res.status(200).json(booking);
      } catch (error) {
          console.error('Error: ', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },

  cancelBooking: async (req, res) => {
    booking_id = req.params.bookingId;
    try{
      const result = await bookingModel.cancelBooking(booking_id);
      res.status(200).json(result);
    }catch(error){
      console.error(error)
    }
  },

    createBooking: async (req, res) => {
        const bookingData = req.body;
      
        try {
          // Call the model function to create a booking
          const bookingId = await bookingModel.createBooking(bookingData);
      
          // Return success response with the created booking ID
          res.status(201).json({
            message: 'Booking created successfully!',
            data: {
              bookingId,
            },
          });
        } catch (error) {
          console.error('Error creating booking:', error);
      
          // Return error response
          res.status(500).json({
            message: 'Internal Server Error',
          });
        }
      }
}

module.exports = bookingController;