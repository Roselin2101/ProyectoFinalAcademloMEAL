const { Router } = require('express');
const {
  signup,
  login,
  updateUser,
  deleteUser,
  findOrders,
  findOrder,
} = require('../controllers/user.controller');
const {
  validPassword,
  validUserByEmail,
  validUserById,
  protect,
  protectAccountOwner,
} = require('../middlewares/user.middleware');
const {
  validateFields,
  signupValidations,
  loginValidations,
} = require('../middlewares/validateFields.middleware');

const router = Router();

router.post('/signup', signupValidations, validateFields, signup);

router.post(
  '/login',
  loginValidations,
  validateFields,
  validUserByEmail,
  validPassword,
  login
);

// router.use(protect);

router.patch('/:id', validUserById, protectAccountOwner, updateUser);

router.delete('/:id', validUserById, protectAccountOwner, deleteUser);

router.get('/orders', findOrders);

router.get('/orders/:id', findOrder);

module.exports = {
  userRouter: router,
};
