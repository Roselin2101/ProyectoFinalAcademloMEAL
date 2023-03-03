const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meal.model');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, price } = req.body;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });
  res.status(200).json({
    status: 'success',
    message: 'The meal has been created successfully',
    meal,
  });
});

exports.getMeals = catchAsync(async (req, res, next) => {
  const meals = Meal.findAll({
    where: {
      status: true,
    },
  });
  res.status(200).json({
    status: 'success',
    meals,
  });
});

exports.getMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;
  await meal.update({
    name,
    price,
  });
  res.status(200).json({
    status: 'success',
    message: 'The meal was updated successfully',
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await meal.update({ status: false });
  res.status(200).json({
    status: 'success',
    message: 'The meal was deleted successfully',
  });
});
