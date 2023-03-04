const { Router } = require('express');
const {
  createOrder,
  updateOrder,
  getOrders,
  deleteOrder,
} = require('../controllers/order.controller');
const { validMealById } = require('../middlewares/meal.middleware');
const { validOrderById } = require('../middlewares/order.middleware');
const { protect } = require('../middlewares/user.middleware');

const router = Router();

// router.use(protect);

router.post('/', validMealById, createOrder);

router.get('/me', getOrders);

router.patch('/:id', validOrderById, updateOrder);

router.delete('/:id', validOrderById, deleteOrder);

module.exports = {
  orderRouter: router,
};
