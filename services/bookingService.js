const Booking = require('../models/booking');

/**
 * Create Booking
 * @param {bookingId, customerName, bookingDate, amount, vendor} data Consisting of booking details
 * @returns success:true if booking is created and success:false in all other scenarios
 */
const createBooking = async (data) => {
  try {
    const newBooking = new Booking(data);
    await newBooking.save();
    return { success: true, data: newBooking };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


/**
 * Get booking based on filter and pagination
 * @param {*} filters 
 * @param {Number} page Page number
 * @param {Number} limit Limit the number of documents
 * @returns Bookings based on the applied filter
 */
const getBookings = async (filters = {}, page = 1, limit = 10) => {
  try {
    page = Math.max(parseInt(page, 10), 1);
    limit = Math.max(parseInt(limit, 10), 1);

    const { date, vendor } = filters;
    const query = {};

    // Filter by vendor
    if (vendor) {
      query.vendor = { $regex: vendor, $options: 'i' };
    }

    // Fetch total record count for pagination
    const totalRecords = await Booking.countDocuments(query);

    // Fetch bookings with pagination
    const bookings = await Booking.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return {
      success: true,
      data: {
        bookings,
        pagination: {
          totalRecords,
          totalPages: Math.ceil(totalRecords / limit),
          currentPage: page,
          limit,
        },
      },
    };
  } catch (err) {
    console.error('Error in getBookings service:', err);
    return { success: false, error: 'Failed to retrieve bookings.' };
  }
};



module.exports = { createBooking, getBookings };
