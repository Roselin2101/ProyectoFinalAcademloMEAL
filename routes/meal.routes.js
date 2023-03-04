const { Router } = require('express');
const {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');
const { validMealById } = require('../middlewares/meal.middleware');
const { validRestaurantById } = require('../middlewares/restaurant.middleware');
const { protect } = require('../middlewares/user.middleware');
const router = Router();

router.get('/', getMeals);
router.get('/:id', validMealById, getMeal);

// router.use(protect);

router.post('/:id', validRestaurantById, createMeal);
router.patch('/:id', validMealById, updateMeal);
router.delete('/:id', validMealById, deleteMeal);

module.exports = {
  mealRouter: router,
};
