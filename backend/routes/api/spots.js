const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Sequelize } = require('../../db/models')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User } = require('../../db/models');

const { check } = require('express-validator');
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



//get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  let ownerId = req.user.id;
  let spots = await Spot.findAll({
    where: {
      ownerId: ownerId
    }
  })

  let spotImages = await SpotImage.findAll();

  let reviews = await Review.findAll();

  let spotList = [];

  let spotImageList = [];

  let reviewList = [];

  spots.forEach(spot => {
    spotList.push(spot.toJSON())
  })

  spotImages.forEach(image => {
    spotImageList.push(image.toJSON())
  })

  reviews.forEach(review => {
    reviewList.push(review.toJSON())
  })


  spotImageList.forEach(image => {
    spotList.forEach(spot => {
      if (image.spotId === spot.id && image.preview) {
        spot.previewImage = image.url
      }
    })
  })

  spotList.forEach(spot => {
    let totalStars = 0;
    let numReviews = 0;
    reviewList.forEach(review => {
      if (review.spotId === spot.id && review.stars !== null) {
        totalStars += review.stars;
        numReviews += 1;
      }
    })
    spot.avgRating = totalStars / numReviews;
  })

  res.json({
    Spots: spotList
  })

});

// beginnings of getting spot details by id
router.get('/:spotId', async (req, res) => {
  let spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    },
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });

  let spotReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    }
  })

  let spotReviewList = [];

  spotReviews.forEach(review => {
    spotReviewList.push(review.toJSON())
  })


  let totalStars = 0;
  let numReviews = 0;
  spotReviewList.forEach(review => {
    if (review.stars !== null) {
      totalStars += review.stars;
      numReviews += 1;
    }
  })
  spot.numReviews = numReviews;
  spot.avgStarRating = totalStars / numReviews;


  res.json({
    "id": spot.id,
    "ownerId": spot.ownerId,
    "address": spot.address,
    "city": spot.city,
    "state": spot.state,
    "country": spot.country,
    "lat": spot.lat,
    "lng": spot.lng,
    "name": spot.name,
    "description": spot.description,
    "price": spot.price,
    "createdAt": spot.createdAt,
    "updatedAt": spot.updatedAt,
    "numReviews": spot.numReviews,
    "avgStarRating": spot.avgStarRating,
    "SpotImages": spot.SpotImages,
    "Owner": spot.Owner
  })

})



//add image to a spot based on the spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  let spotId = req.params.spotId;

  let spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.statusCode = 404;
    res.json({
      "message": 'Spot couldn\'t be found'
    })
  }

  if (req.user.id !== spot.ownerId) {
    throw new Error('User not authorized')
  }

  let { url, preview } = req.body;

  let newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview
  })

  res.json({
    "id": newSpotImage.id,
    "url": newSpotImage.url,
    "preview": newSpotImage.preview
  })

})

//create new spot
router.post('/', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })


  res.json(newSpot)
})

//get all spots
router.get('/', async (req, res) => {
  let spots = await Spot.findAll();

  let spotImages = await SpotImage.findAll();

  let reviews = await Review.findAll();

  let spotList = [];

  let spotImageList = [];

  let reviewList = [];

  spots.forEach(spot => {
    spotList.push(spot.toJSON());
  })

  spotImages.forEach(image => {
    spotImageList.push(image.toJSON());
  })

  reviews.forEach(review => {
    reviewList.push(review.toJSON());
  })

  //get preview image onto response object
  spotImageList.forEach(image => {
    spotList.forEach(spot => {
      if (image.spotId === spot.id && image.preview) {
        spot.previewImage = image.url
      }
    })
  })

  //get avgRating onto response object
  spotList.forEach(spot => {
    let totalStars = 0;
    let numReviews = 0;
    reviewList.forEach(review => {
      if (review.spotId === spot.id && review.stars !== null) {
        totalStars += review.stars;
        numReviews += 1;
      }
    })
    spot.avgRating = totalStars / numReviews;
  })

  res.json({
    Spots: spotList
  })
});





module.exports = router;