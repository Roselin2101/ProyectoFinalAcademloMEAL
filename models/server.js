const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { userRouter } = require('../routes/user.router');
const { restautantRouter } = require('../routes/restaurant.router');
const { mealRouter } = require('../routes/meal.router');
const { orderRouter } = require('../routes/order.router');
const initModel = require('./initModel');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');
const morgan = require('morgan');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.patchs = {
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      meal: 'api/v1/meals',
      order: 'api/v1/orders',
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  routes() {
    this.app.use(this.patchs.meal, mealRouter);
    this.app.use(this.patchs.order, orderRouter);
    this.app.use(this.patchs.user, userRouter);
    this.app.use(this.patchs.restaurant, restautantRouter);

    // this.app.call('*', (req, res, next) => {
    //   return next(
    //     new AppError(`Can't find ${req.originalUrl} on this server`, 404)
    //   );
    // });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.error(error));

    initModel();

    db.sync({ force: true })
      .then(() => console.log('Database synced!!!  '))
      .catch(error => console.error(error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port: ', this.port);
    });
  }
}

module.exports = Server;
