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


router.post('/:reviewId/images', requireAuth, async (req, res) => {
  let userId = req.user.id;
  let reviewId = req.params.reviewId;
  const { url } = req.body;
  let review = await Review.findByPk(reviewId);

  if (!review) {
    res.statusCode = 404;
    return res.json({
      message: "Review couldn't be found"
    })
  }

  if (review.userId !== userId) {
    res.statusCode = 403;
    return res.json({
      message: "Forbidden"
    })
  }

  let newReviewImage = await ReviewImage.create({
    reviewId,
    url
  })

  return res.json({
    id: newReviewImage.id,
    url: newReviewImage.url
  })
})

//edit a review
router.put('/:reviewId', requireAuth, async (req, res) => {
  let reviewId = req.params.reviewId;
  let userId = req.user.id;
  let { review, stars } = req.body;

  let existingReview = await Review.findByPk(reviewId);
  if (!existingReview) {
    res.statusCode = 404;
    return res.json({
      message: "Review couldn't be found"
    })
  }

  let errors = {};
  if (!review) errors.review = "Review text is required";
  if (!stars || typeof (stars) !== 'number' || stars < 1 || stars > 5 || stars !== Math.floor(stars)) errors.stars = "Stars must be an integer from 1 to 5";
  if (Object.keys(errors).length > 0) {
    res.statusCode = 400;
    res.json({
      message: "Bad Request",
      errors
    })
  }

  if (existingReview.userId !== userId) {
    res.statusCode = 403;
    return res.json({
      message: "Forbidden"
    })
  }

  existingReview.review = review;
  existingReview.stars = stars;

  await existingReview.save();

  return res.json({
    id: existingReview.id,
    userId: existingReview.userId,
    spotId: existingReview.spotId,
    review: existingReview.review,
    stars: existingReview.stars,
    createdAt: existingReview.createdAt,
    updatedAt: existingReview.updatedAt
  })
})

//delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  let reviewId = req.params.reviewId;
  let userId = req.user.id;
  let existingReview = await Review.findByPk(reviewId);

  if (!existingReview) {
    res.statusCode = 404;
    return res.json({
      message: "Review couldn't be found"
    })
  }

  console.log(existingReview.userId)
  if (existingReview.userId !== userId) {
    res.statusCode = 403;
    return res.json({
      message: "Forbidden"
    })
  }

  await existingReview.destroy();

  return res.json({
    message: "Successfully deleted"
  })

})

//get all reviews of current user
router.get('/current', requireAuth, async (req, res) => {
  let userId = req.user.id;
  let reviews = await Review.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
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
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  reviews = reviews.map(review => {
    review = review.toJSON();
    if (review.Spot.SpotImages && review.Spot.SpotImages.length > 0) {
      review.Spot.previewImage = review.Spot.SpotImages[0].url
    } else {
      review.Spot.previewImage = '';
    }
    delete review.Spot.SpotImages;
    return review;
  });

  res.json({
    Reviews: reviews
  })
});










module.exports = router;