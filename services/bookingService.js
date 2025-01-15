const Booking = require('../models/Booking');

/**
 * Create Booking
 * @param {bookingId, customerName, bookingDate, amount, vendor} data Consisting of booking details
 * @returns success:true if booking is created and success:false in all other scenarios
 */
const createBooking = async (data) => {
  try {
    const newBooking = new Booking(data);
    await newBooking.save();
    return { success: true, booking: newBooking };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


module.exports = { createBooking};
