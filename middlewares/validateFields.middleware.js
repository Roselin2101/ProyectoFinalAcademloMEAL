const { validationResult, check } = require('express-validator');

/* A middleware function that checks if the request body has any errors. If there are errors, it
returns a 400 status code with the errors. If there are no errors, it calls the next middleware
function. */
exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.signupValidations = [
  check('name', 'the name is required').not().isEmpty(),
  check('email', 'The email is mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password is mandatory').not().isEmpty(),
];

exports.loginValidations = [
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];

exports.updateUserValidation = [
  check('name', 'the name is required').not().isEmpty(),
  check('email', 'The email is mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
];

exports.createRestaurantValidation = [
  check('name', 'the name is required').not().isEmpty(),
  check('address', 'the address is required').not().isEmpty(),
  check('rating', 'the rating is required').not().isEmpty(),
  check('rating', 'the rating required and is number').isNumeric(),
];

exports.createReviewValidation = [
  check('comment', 'The comment is required').not().isEmpty(),
  check('rating', 'The rating is required').not().isEmpty(),
  check('rating', 'The rating must be a number').isInt(),
];
