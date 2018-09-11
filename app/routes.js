const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');

// middleware usado para enviar flash para todas as rotas
routes.get((req, res, next) => {
  // locals: variaveis passadas para as views
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
 * login e signup
 */
routes.get('/', authController.signin);
routes.get('/signup', authController.signup);

/**
 * Auth
 */
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

/**
 * Dashboard
 */
routes.use('/dashboard', authMiddleware);
routes.get('/dashboard', dashboardController.index);

module.exports = routes;
