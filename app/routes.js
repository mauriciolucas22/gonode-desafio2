const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const documentController = require('./controllers/documentController');

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
routes.get('/project/:id', projectController.show);
routes.post('/project/create', projectController.store);
routes.put('/project/:projectId', projectController.update);
routes.delete('/project/:projectId', projectController.destroy);

/**
 * Document
 */
routes.get('/project/:projectId/document/:id', documentController.show);
routes.post('/project/:projectId/document/create', documentController.store);
routes.put('/project/:projectId/document/:id', documentController.update);
routes.delete('/project/:projectId/document/:id', documentController.destroy);

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
