const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
	bookingStart: {
		type: Date,
		required: true
	},
	bookingEnd: {
		type: Date,
		required: true
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User"
	},
	company: {
		type: mongoose.Schema.ObjectId,
		ref: "Company",
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Booking", BookingSchema);
