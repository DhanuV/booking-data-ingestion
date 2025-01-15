const bookingService = require('../services/bookingService');

// Create a booking
const createBooking = async (req, res) => {
  const result = await bookingService.createBooking(req.body);
  if (result.success) {
    return res.status(201).json({ success: true, booking: result.booking });
  } else {
    return res.status(400).json({ success: false, message: result.error });
  }
};

module.exports = { createBooking};
