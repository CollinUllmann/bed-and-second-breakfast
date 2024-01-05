const express = require('express');
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spotimage = require('../../db/models/spotimage');

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

router.delete('/:imageId', requireAuth, async (req, res) => {
  let imageId = req.params.imageId;
  let userId = req.user.id;

  let imageToDelete = await ReviewImage.findByPk(imageId);

  if (!imageToDelete) {
    res.statusCode = 404;
    return res.json({
      message: "Review Image couldn't be found"
    })
  }

  let review = await Review.findByPk(imageToDelete.reviewId)

  if (review.userId !== userId) {
    res.statusCode = 403;
    return res.json({
      message: "Forbidden"
    })
  }

  await imageToDelete.destroy();

  return res.json({
    message: "Successfully deleted"
  })


})








module.exports = router;