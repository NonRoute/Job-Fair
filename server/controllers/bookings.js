const Booking = require("../models/Booking");
const Company = require("../models/Company");
const User = require("../models/User");
const { sendMail } = require("./mails");

//@desc     Get all bookings
//@route    GET /api/v1/bookings
//@access   Private
exports.getBookings = async (req, res, next) => {
	let query;
	let companyId = req.query["companyId"];
	if (req.user.role !== "admin") {
		if (companyId) {
			query = Booking.find({
				$or: [
					{ user: { $exists: false } }, // There is no user associated with the booking
					{ user: req.user.id } // The user is the requesting user
				]
			}).populate({
				path: "company",
				select: "name address tel"
			});
		} else {
			query = Booking.find({
				user: req.user.id
			}).populate({
				path: "company",
				select: "name address tel"
			});
		}
	} else {
		if (companyId) {
			query = Booking.find({ company: companyId })
				.populate({
					path: "company",
					select: "name address tel"
				})
				.populate({
					path: "user",
					select: "name email tel"
				});
		} else {
			query = Booking.find()
				.populate({
					path: "company",
					select: "name address tel"
				})
				.populate({
					path: "user",
					select: "name email tel"
				});
		}
	}
	try {
		const bookings = await query;
		res.status(200).json({
			success: true,
			count: bookings.length,
			data: bookings
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, message: "Cannot find Booking" });
	}
};

//@desc     Get single booking
//@route    GET /api/v1/bookings/:id
//@access   Private
exports.getBooking = async (req, res, next) => {
	let booking;
	try {
		booking = await Booking.findById(req.params.id)
			.populate({
				path: "company",
				select: "name address tel"
			})
			.populate({
				path: "user",
				select: "name email tel"
			});

		if (!booking) {
			return res.status(404).json({
				success: false,
				message: `No booking with the id of ${req.params.id}`
			});
		}

		if (req.user.role == "admin" || (booking.user && booking.user.toString() == req.user.id)) {
			return res.status(200).json({ success: true, data: booking });
		}
		return res.status(401).json({
			success: false,
			message: `User ${req.user.id} is not authorized to view this booking`
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, message: "Cannot find Booking" });
	}
};

//@desc     Assign booking
//@route    PUT /api/v1/bookings/assign/:id
//@access   Private
exports.assignBooking = async (req, res, next) => {
	try {
		let booking = await Booking.findById(req.params.id);
		if (!booking) {
			return res.status(404).json({
				success: false,
				message: `No booking with the id of ${req.params.id}`
			});
		}
		if (booking.user) {
			return res.status(400).json({
				success: false,
				message: `Booking is not available`
			});
		}
		req.body.user = req.user.id;

		// only allow the registered user to book up to 3 nights
		const bookingStart = new Date(req.body.bookingStart);
		const existedBookings = await Booking.find({ user: req.user.id });

		if (existedBookings.length >= 3) {
			return res.status(400).json({
				success: false,
				message: `The user with ID ${req.user.id} has already made 3 bookings`
			});
		} else {
			booking = await Booking.findByIdAndUpdate(
				req.params.id,
				{ user: req.body.user },
				{
					new: true,
					runValidators: true
				}
			);
			return res.status(200).json({
				success: true,
				data: booking
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Cannot create Booking"
		});
	}
};

//@desc     Remove interviewee out from session
//@route    DELETE /api/v1/bookings/assign/:id
//@access   Private
exports.removeBooking = async (req, res, next) => {
	try {
		let booking = await Booking.findById(req.params.id);
		if (!booking) {
			return res.status(404).json({
				success: false,
				message: `No booking with the id of ${req.params.id}`
			});
		}
		// Check if the booking already has a user
		if (!booking.user) {
			return res.status(400).json({
				success: false,
				message: `Booking with ID ${req.params.id} does not have an interviewee to remove`
			});
		}

		if (req.user.role == "admin" || (booking.user && booking.user.toString() == req.user.id)) {
			// Remove the user from the booking
			booking.user = undefined;
			await booking.save();
			return res.status(200).json({
				success: true,
				data: booking
			});
		}
		return res.status(401).json({
			success: false,
			message: `User ${req.user.id} is not authorized to update this booking`
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Error removing user from Booking"
		});
	}
};

//@desc     Add session
//@route    POST /api/v1/companies/:companyId/bookings/session
//@access   Private admin
exports.addSession = async (req, res, next) => {
	try {
		req.body.company = req.params.companyId;
		const company = await Company.findById(req.params.companyId);
		if (!company) {
			return res.status(404).json({
				success: false,
				message: `No company with the id of ${req.params.companyId}`
			});
		}
		const booking = await Booking.create(req.body);
		res.status(200).json({
			success: true,
			data: booking
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Cannot create Session"
		});
	}
};

//@desc     Update booking
//@route    PUT /api/v1/bookings/:id
//@access   Private
exports.updateBooking = async (req, res, next) => {
	try {
		let booking = await Booking.findById(req.params.id);
		if (!booking) {
			return res.status(404).json({
				success: false,
				message: `No booking with the id of ${req.params.id}`
			});
		}

		if (req.user.role == "admin" || (booking.user && booking.user.toString() == req.user.id)) {
			booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true
			});
			return res.status(200).json({
				success: true,
				data: booking
			});
		}
		return res.status(401).json({
			success: false,
			message: `User ${req.user.id} is not authorized to update this booking`
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Cannot update Booking"
		});
	}
};

//@desc     Delete booking
//@route    DELETE /api/v1/bookings/:id
//@access   Private
exports.deleteBooking = async (req, res, next) => {
	try {
		const booking = await Booking.findById(req.params.id);
		if (!booking) {
			return res.status(404).json({
				success: false,
				message: `No booking with the id of ${req.params.id}`
			});
		}

		if (req.user.role == "admin" || (booking.user && booking.user.toString() == req.user.id)) {
			await booking.remove();
			return res.status(200).json({ success: true, data: {} });
		}
		return res.status(401).json({
			success: false,
			message: `User ${req.user.id} is not authorized to delete this booking`
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Cannot delete Booking"
		});
	}
};
