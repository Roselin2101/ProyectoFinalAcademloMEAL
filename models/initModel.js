const Review = require('./reviews.models');
const User = require('./user.model');
const Order = require('./order.model');
const Restaurant = require('./restaurant.model');
const Meal = require('./meal.model');

const initModel = () => {
  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasMany(Review);
  Review.belongsTo(User);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Meal);

  Meal.hasMany(Order);
  Order.belongsTo(Meal);
};

module.exports = initModel;
