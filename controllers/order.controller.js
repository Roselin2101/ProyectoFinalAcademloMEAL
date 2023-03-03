const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;

  const { meal, sessionUser } = req;

  const order = await Order.create({
    quantity,
    mealId: meal.id,
    userId: sessionUser.id,
    totalPrice: meal.price * quantity,
  });
  res.status(201).json({
    status: 'success',
    message: 'The order has been created',
    order,
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: 'completed' });
  res.status(200).json({
    status: 'success',
    message: 'The order was completed successfully',
  });
});
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await order.update({ status: 'cancelled' });
  res.status(200).json({
    status: 'success',
    message: 'The order was cancelled successfully',
  });
});
