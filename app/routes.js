const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');

// middleware usado para enviar flash para todas as rotas
routes.get((req, res, next) => {
  // locals: variaveis passadas para as views
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
 * login signup e signout
 */
routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);
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

/**
 * Project
 */
routes.use('/project', authMiddleware);
routes.get('/project', projectController.index);

/**
 * handle error
 */

routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

module.exports = routes;
