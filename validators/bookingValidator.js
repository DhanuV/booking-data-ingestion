const Joi = require('joi');

// Defined schema for booking data
const bookingSchema = Joi.object({
  bookingId: Joi.string().required(),
  customerName: Joi.string().required(),
  bookingDate: Joi.date().iso().required(),
  amount: Joi.number().min(0).required(),
  vendor: Joi.string().required(),
});

/**
 * 
 * @param {*} data 
 * @returns validated Booking based on the schema
 */
const validateBookingData = (data) => {
  return bookingSchema.validate(data);
};

module.exports = validateBookingData;