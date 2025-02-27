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

//Get bookings
const getBookings = async (req, res) => {
  try {
    const { date, vendor, page, limit } = req.query;
    const result = await bookingService.getBookings({ date, vendor }, page, limit);

    if (result.success) {
      return res.status(200).json({
        success: true,
        data: result.data.bookings,
        pagination: result.data.pagination,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.error || 'Failed to fetch bookings.',
      });
    }
  } catch (err) {
    console.error('Error in getBookings controller:', err);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred.',
    });
  }
};

// Get a booking by ID with caching
const getBookingById = async (req, res) => {
    const { id } = req.params;
    const result = await bookingService.getBookingById(id);
    if (result.success) {
      return res.status(200).json({ success: true, booking: result.booking });
    } else {
      return res.status(404).json({ success: false, message: result.error });
    }
  };

  
// Delete a booking by ID
const deleteBookingById = async (req, res) => {
    const { id } = req.params;
    const result = await bookingService.deleteBookingById(id);
    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ success: false, message: result.error });
    }
  };

module.exports = { createBooking, getBookings, getBookingById, deleteBookingById };
