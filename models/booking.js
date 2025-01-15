const mongoose = require('mongoose');

/**
 * Schema for Booking
 * Define the schema for the booking data
 * TODO: Add necessary indexes
 */
const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    vendor: { type: String, required: true },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;