/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - bookingStart
 *         - bookingEnd
 *         - user
 *         - company
 *       properties:
 *         bookingStart:
 *           type: string
 *           format: date
 *           example: '2023-08-20T14:00:00'
 *           description: Interview start date time
 *         bookingEnd:
 *           type: string
 *           format: date
 *           example: '2023-08-20T15:30:00'
 *           description: Interview end date time
 *         user:
 *           type: string
 *           description: ID of the user making the booking
 *         company:
 *           type: string
 *           description: ID of the company being booked
 *         createdAt:
 *           type: string
 *           format: date
 *           example: '2023-08-20'
 *           description: Date of creation (default is current date-time)
 */

/**
 * @swagger
 * components:
 *   requestBodies:
 *     BookingBody:
 *       type: object
 *       required:
 *         - bookingStart
 *         - bookingEnd
 *       properties:
 *         bookingStart:
 *           type: string
 *           format: date
 *           example: '2023-08-20T14:00:00'
 *           description: Interview start date time
 *         bookingEnd:
 *           type: string
 *           format: date
 *           example: '2023-08-20T15:30:00'
 *           description: Interview end date time
 *         createdAt:
 *           type: string
 *           format: date
 *           example: '2023-08-20'
 *           description: Date of creation (default is current date-time)
 */

const express = require("express");
const {
	getBookings,
	getBooking,
	assignBooking,
	removeBooking,
	updateBooking,
	deleteBooking,
	addSession
} = require("../controllers/bookings");

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: The booking managing API
 */

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");

/**
 * @swagger
 * /bookings:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns the list of all the bookings
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: companyId
 *         schema:
 *           type: string
 *         required: false
 *         description: The company id (Optional)
 *     responses:
 *       200:
 *         description: The list of the bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Booking'
 */

router.route("/").get(protect, getBookings);

/**
 * @swagger
 * /bookings/assign/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Assign a user to a Booking by booking id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/BookingBody'
 *     responses:
 *       201:
 *         description: The booking was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error
 */

router
	.route("/assign/:id")
	.put(protect, authorize("admin", "user"), assignBooking)
	.delete(protect, authorize("admin", "user"), removeBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the booking by id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking information by booking id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The booking was not found
 */

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update the booking by id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/BookingBody'
 *     responses:
 *       200:
 *         description: The booking was successfully updated
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The booking was not found
 */

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete the booking by id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking was successfully deleted
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The booking was not found
 */

router
	.route("/:id")
	.get(protect, getBooking)
	.put(protect, authorize("admin", "user"), updateBooking)
	.delete(protect, authorize("admin", "user"), deleteBooking);

/**
 * @swagger
 * /companies/{companyId}/bookings/session:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new blank Booking for the company specified by company id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         schema:
 *           type: string
 *         required: true
 *         description: The company id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/BookingBody'
 *     responses:
 *       201:
 *         description: The booking was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error
 */

router.route("/session").post(protect, authorize("admin"), addSession);

module.exports = router;
