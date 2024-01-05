const express = require('express');
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spotimage = require('../../db/models/spotimage');
const booking = require('../../db/models/booking');
const { contentSecurityPolicy } = require('helmet');

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

//get all reviews by a spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId;
  const reviews = await Review.findAll({
    where: {
      spotId: spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  res.json({
    Reviews: reviews
  })
})

//get all bookings for a spot based on the spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  let spot = await Spot.findByPk(spotId)
  const userId = req.user.id;

  if (!spot) {
    res.statusCode = 404;
    return res.json({
      message: "Spot couldn't be found"
    })
  }

  if (spot.ownerId === userId) {
    let ownerBookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    })
    return res.json({
      Bookings: ownerBookings
    })
  } else {
    let userBookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })
    return res.json({
      Bookings: userBookings
    })
  }

})

//create a booking from a spot based on the spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  let userId = req.user.id;
  let spotId = req.params.spotId;
  let spot = await Spot.findByPk(spotId);

  if (spot.ownerId === userId) {
    return res.json({
      message: "Spot cannot be booked by owner"
    })
  }

  let { startDate, endDate } = req.body;
  let currentDate = new Date();


  startDate = new Date(startDate);
  endDate = new Date(endDate)


  let errors = {};
  if (currentDate.getTime() > startDate.getTime()) {
    errors.startDate = "startDate cannot be in the past"
  }

  if (startDate.getTime() >= endDate.getTime()) {
    errors.endDate = "endDate cannot be on or before startDate"
  }

  if (Object.keys(errors).length > 0) {
    return res.json({
      message: "Bad Request",
      errors
    })
  }

  let bookingErrors = {};
  let existingBookings = await Booking.findAll({
    where: {
      spotId: spotId
    }
  })
  existingBookings.forEach(booking => {
    let existingStartDate = booking.startDate.getTime();
    let existingEndDate = booking.endDate.getTime();
    let newStartDate = startDate.getTime();
    let newEndDate = endDate.getTime()
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




  let newBooking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate
  })

  return res.json(newBooking)


})

//create a review for a spot based on the spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const spotId = req.params.spotId
  const { review, stars } = req.body;
  const userId = req.user.id;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    res.statusCode = 404;
    return res.json({ message: 'Spot couldn\'t be found' })
  }

  let errors = {};
  if (!review) errors.review = 'Review text is required';
  if (!stars || typeof (stars) !== 'number' || stars < 1 || stars > 5 || stars !== Math.floor(stars)) errors.stars = 'Stars must be an integer from 1 to 5'
  if (Object.keys(errors).length > 0) {
    res.statusCode = 400;
    return res.json({
      message: "Bad Request",
      errors
    })
  }

  const existingReview = await Review.findAll({
    where: {
      spotId: spotId,
      userId: userId
    }
  })
  if (existingReview.length > 0) {
    res.statusCode = 500;
    return res.json({
      message: 'User already has a review for this spot'
    })
  }

  const newReview = await Review.create({
    userId,
    spotId,
    review,
    stars
  })

  res.json(newReview)
})

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

//edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
  let spotId = req.params.spotId;
  let user = req.user
  let { address, city, state, country, lat, lng, name, description, price } = req.body;
  let spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.statusCode = 404;
    return res.json({
      "message": 'Spot couldn\'t be found'
    })
  }

  if (user.id !== spot.ownerId) {
    return res.json({
      "message": 'Only the owner of the spot is authorized to make changes'
    })
  }

  let errors = {};

  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Country is required";
  if (lat < -90 || lat > 90) errors.lat = "Latitude must be within -90 and 90";
  if (lng < -180 || lng > 180) errors.lng = "Longitude must be within -180 and 180";
  if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (price < 0) errors.price = "Price per day must be a positive number"

  if (Object.keys(errors).length > 0) {
    res.statusCode = 400;
    return res.json({
      "message": "Bad Request",
      errors
    })
  }


  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;

  await spot.save();

  res.json(spot)
})

//delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const userId = req.user.id;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    res.statusCode = 404;
    return res.json({
      "message": 'Spot couldn\'t be found'
    })
  }
  if (spot.ownerId !== userId) {
    return res.json({
      "message": 'Only the owner of the spot is authorized to delete'
    })
  }

  await spot.destroy();

  res.json({
    "message": 'Successfully deleted'
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
// router.get('/', async (req, res) => {
//   let spots = await Spot.findAll();
//   let spotImages = await SpotImage.findAll();
//   let reviews = await Review.findAll();

//   let spotList = [];
//   let spotImageList = [];
//   let reviewList = [];

//   spots.forEach(spot => {
//     spotList.push(spot.toJSON());
//   })
//   spotImages.forEach(image => {
//     spotImageList.push(image.toJSON());
//   })
//   reviews.forEach(review => {
//     reviewList.push(review.toJSON());
//   })

//   //get preview image onto response object
//   spotImageList.forEach(image => {
//     spotList.forEach(spot => {
//       if (image.spotId === spot.id && image.preview) {
//         spot.previewImage = image.url
//       }
//     })
//   })

//   //get avgRating onto response object
//   spotList.forEach(spot => {
//     let totalStars = 0;
//     let numReviews = 0;
//     reviewList.forEach(review => {
//       if (review.spotId === spot.id && review.stars !== null) {
//         totalStars += review.stars;
//         numReviews += 1;
//       }
//     })
//     spot.avgRating = totalStars / numReviews;
//   })

//   res.json({
//     Spots: spotList
//   })
// });

router.get('/', async (req, res) => {
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;


  page = parseInt(page) || 1;
  size = parseInt(size) || 20;
  minLat = parseFloat(minLat);
  maxLat = parseFloat(maxLat);
  minLng = parseFloat(minLng);
  maxLng = parseFloat(maxLng);
  minPrice = parseFloat(minPrice);
  maxPrice = parseFloat(maxPrice);

  let filters = {};
  let filterErrors = {};
  if (isNaN(page) || page < 1 || page > 10) {
    filterErrors.page = "Page must be greater than or equal to 1"
  }

  if (isNaN(size) || size < 1 || size > 20) {
    filterErrors.size = "Size must be greater than or equal to 1"
  }

  if (!isNaN(minLat)) {
    filters.lat = { [Op.gte]: minLat }
  } else if (minLat) {
    filterErrors.minLat = "Minimum latitude is invalid"
  }

  if (!isNaN(maxLat)) {
    filters.lat = { ...filters.lat, [Op.lte]: maxLat };
  } else if (maxLat) {
    filterErrors.maxLat = "Maximum latitude is invalid"
  }

  if (!isNaN(minLng)) {
    filters.lng = { [Op.gte]: minLng };
  } else if (minLng) {
    filterErrors.minLng = "Minimum latitude is invalid"
  }

  if (!isNaN(maxLng)) {
    filters.lng = { ...filters.lng, [Op.lte]: maxLng };
  } else if (maxLng) {
    filterErrors.maxLng = "Maximum longitude is invalid"
  }

  if (!isNaN(minPrice) && minPrice > 0) {
    filters.price = { [Op.gte]: minPrice };
  } else if (minPrice) {
    filterErrors.minPrice = "Minimum price must be greater than or equal to 0"
  }

  if (!isNaN(maxPrice) && maxPrice > 0) {
    filters.price = { ...filters.price, [Op.lte]: maxPrice };
  } else if (maxPrice) {
    filterErrors.maxPrice = "Maximum price must be greater than or equal to 0"
  }

  if (Object.keys(filterErrors).length > 0) {
    res.statusCode = 400;
    return res.json({
      message: "Bad Request",
      errors: filterErrors
    })
  }

  const spots = await Spot.findAll({
    where: {
      ...filters
    },
    offset: size * (page - 1),
    limit: size,
    attributes: [
      'id',
      'ownerId',
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt',
      // [Sequelize.literal('(SELECT AVG(stars) FROM Reviews WHERE Reviews.spotId = Spot.id)'), 'avgRating']
    ],
    include: [
      {
        model: SpotImage,
        attributes: ['url'],
        where: {
          preview: true
        },
        required: false
      }
    ]
  });

  let returnSpots = spots.map(spot => ({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    avgRating: parseFloat(spot.getDataValue('avgRating') || 0),
    previewImage: spot.SpotImages.length ? spot.SpotImages[0].url : ''
  }))

  res.json({
    Spots: returnSpots,
    page,
    size
  });

});






module.exports = router;