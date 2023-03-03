const Restaurant = require('../models/restaurant.model');
const Review = require('../models/reviews.models');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: true,
    },
  });
  if (!restaurant) {
    return next(new AppError('The restaurant does not exist', 404));
  }
  req.restaurant = restaurant;
  next();
});

exports.validReviewId = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
      status: true,
    },
  });
  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }
  req.restaurant = restaurant;
  next();
});

exports.validExistsReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: User,
      },
    ],
  });
  if (!review) {
    return next(new AppError('Review not found', 404));
  }
  req.review = review;
  req.user = review.user;
  next();
});
