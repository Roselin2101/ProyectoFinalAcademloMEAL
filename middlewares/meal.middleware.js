const Meal = require('../models/meal.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsyncc');

exports.validMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { mealId } = req.body;

  const meal = await Meal.findOne({
    where: {
      id: id || mealId,
      status: 'active',
    },
  });
  if (!meal) {
    return next(new AppError('The meal does not exist', 404));
  }
  req.meal = meal;
  next();
});
