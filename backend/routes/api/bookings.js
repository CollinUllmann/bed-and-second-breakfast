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

//get all of the current user's bookings
//I still need to get preivewImage to come with the Spot inclusion (see API Docs)
router.get('/current', requireAuth, async (req, res) => {
  let userId = req.user.id;
  let currentUserBookings = await Booking.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
      }
    ]
  })

  res.json({
    Bookings: currentUserBookings
  })


})












module.exports = router;