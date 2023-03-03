const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviews.models');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    message: 'The restaurant has been created ',
    restaurant,
  });
});

exports.findRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    restaurants,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;
  await restaurant.update({
    name,
    address,
  });
  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been updated',
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  await restaurant.update({ status: false });
  res.status(200).json({
    status: 'success',
    message: 'The restaurant was deleted successfully',
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser } = req;

  const review = await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId: restaurant.id,
    rating,
  });
  res.status(201).json({
    status: 'success',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({
    comment,
    rating,
  });
  res.status(200).json({
    status: 'success',
    message: 'The review has been updated',
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  await review.update({ status: false });
  res.status(200).json({
    status: 'success',
    message: 'The review was deleted successfully',
  });
});
