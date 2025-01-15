const Booking = require('../models/booking');
const validateBookingData = require('../validators/bookingValidator');

/**
 * Normalize booking data by converting data to standard format
 * @param {*} data 
 * @returns Booking with converted date to standard format
 */
const normalizeBookingData = (data) => {
    return {
      ...data,
      bookingDate: new Date(data.bookingDate).toISOString(),
    };
  };

/**
 * Create Booking
 * @param {bookingId, customerName, bookingDate, amount, vendor} data Consisting of booking details
 * @returns success:true if booking is created and success:false in all other scenarios
 */
const createBooking = async (data) => {
  const { error } = validateBookingData(data);
  if (error) {
    return { success: false, error: error.details[0].message };
  }
  const normalizedData = normalizeBookingData(data);
  try {
    const newBooking = new Booking(normalizedData);
    await newBooking.save();
    return { success: true, booking: newBooking };
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

    // Filter by date
    if (date) {
      // Ensure the date is in the correct format
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate)) {
        const startOfDay = new Date(parsedDate.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(parsedDate.setUTCHours(23, 59, 59, 999));
        query.bookingDate = { $gte: startOfDay, $lt: endOfDay };
      } else {
        throw new Error('Invalid date format. Use YYYY-MM-DD.');
      }
    }

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
      .sort({ bookingDate: -1 }) // Sort by date, most recent first
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
    return { success: false, error: err.message || 'Failed to retrieve bookings.' };
  }
};



module.exports = { createBooking, getBookings };
