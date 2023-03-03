const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.validUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });
  if (!user) {
    return next(new AppError('The user does not exist', 404));
  }
  req.user = user;
  next();
});

exports.validUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
      status: true,
    },
  });
  if (!user) {
    return next(new AppError('The user is not registered', 401));
  }
  req.user = user;
  next();
});

exports.validPassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid Credentials', 401));
  }
  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  //obtener el token y revisar si esta ahi
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not looged in! Please log in to get access', 401)
    );
  }
  //verificar el token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: true,
    },
  });
  if (!user) {
    return next(
      new AppError('The owner of this token is no longer available', 401)
    );
  }

  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError('User changed password recently, please login again.', 401)
      );
    }
  }
  req.sessionUser = user;
  next();
});
exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;
  console.log(user.id, sessionUser.id);
  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401));
  }
  next();
});
