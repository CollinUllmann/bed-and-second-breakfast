const express = require('express');
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spotimage = require('../../db/models/spotimage');
const booking = require('../../db/models/booking');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const router = express.Router();

//edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  let userId = req.user.id;
  let bookingId = req.params.bookingId;

  let bookingToEdit = await Booking.findByPk(bookingId);

  if (!bookingToEdit) {
    res.statusCode = 404;
    return res.json({
      message: "Booking couldn't be found"
    })
  }

  if (bookingToEdit.userId !== userId) {
    res.statusCode = 403;
    return res.json({
      message: "Forbidden"
    })
  }

  const { startDate, endDate } = req.body;

  let errors = {};
  if (!startDate || new Date(startDate).getTime() < new Date().getTime()) {
    errors.startDate = "startDate cannot be in the past"
  }
  if (!endDate || new Date(startDate).getTime() >= new Date(endDate).getTime()) {
    errors.endDate = "endDate cannot be on or before startDate"
  }

  if (Object.keys(errors).length > 0) {
    res.statusCode = 400;
    return res.json({
      message: "Bad Request",
      errors
    })
  }

  let bookingErrors = {};
  let existingBookings = await Booking.findAll({
    where: {
      spotId: bookingToEdit.spotId
    }
  })
  existingBookings.forEach(booking => {
    let existingStartDate = booking.startDate.getTime();
    let existingEndDate = booking.endDate.getTime();
    let newStartDate = new Date(startDate).getTime();
    let newEndDate = new Date(endDate).getTime()
    if (newStartDate >= existingStartDate && newStartDate <= existingEndDate) {
      bookingErrors.startDate = "Start date conflicts with an existing booking"
    }
    if (newEndDate >= existingStartDate && newEndDate <= existingEndDate) {
      bookingErrors.endDate = "End date conflicts with an existing booking"
    }
    if (newStartDate <= existingStartDate && newEndDate >= existingEndDate) {
      bookingErrors.startDate = "Start date conflicts with an existing booking";
      bookingErrors.endDate = "End date conflicts with an existing booking"
    }
  })

  if (Object.keys(bookingErrors).length > 0) {
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: bookingErrors
    })
  }


  bookingToEdit.startDate = startDate;
  bookingToEdit.endDate = endDate;

  await bookingToEdit.save()

  return res.json(bookingToEdit)

})

//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  let bookingId = req.params.bookingId;
  let userId = req.user.id;

  let bookingToDelete = await Booking.findByPk(bookingId);

  if (!bookingToDelete) {
    res.statusCode = 404;
    return res.json({
      message: "Booking couldn't be found"
    })
  }

  if (bookingToDelete.userId !== userId) {
    res.statusCode = 403;
    return res.json({
      message: "Forbidden"
    })
  }

  if (new Date().getTime() >= new Date(bookingToDelete.startDate).getTime()) {
    res.statusCode = 403;
    return res.json({
      message: "Bookings that have been started can't be deleted"
    })
  }

  await bookingToDelete.destroy();

  return res.json({
    message: "Successfully deleted"
  })

})

//get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
  let userId = req.user.id;
  let currentUserBookings = await Booking.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        include: [
          {
            model: SpotImage,
            where: {
              preview: true
            },
            attributes: ['url']
          }
        ]
      }
    ]
  })

  currentUserBookings = currentUserBookings.map(booking => {
    booking = booking.toJSON();
    if (booking.Spot.SpotImages && booking.Spot.SpotImages.length > 0) {
      booking.Spot.previewImage = booking.Spot.SpotImages[0].url
    } else {
      booking.Spot.previewImage = '';
    }
    delete booking.Spot.SpotImages;
    return booking;
  });

  res.json({
    Bookings: currentUserBookings
  })


})












module.exports = router;