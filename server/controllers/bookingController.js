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
    }
}

module.exports = bookingController;