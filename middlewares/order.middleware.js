const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');

exports.validOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });
  if (!order) {
    return next(new AppError('The order does not exist', 404));
  }
  req.order = order;
  next();
});
