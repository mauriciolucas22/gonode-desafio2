const express = require('express');

const routes = express.Router();

const authController = require('./controllers/authController');

// middleware usado para enviar flash para todas as rotas
routes.get((req, res, next) => {
  // locals: variaveis passadas para as views
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', authController.signin);
routes.get('/signup', authController.signup);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

module.exports = routes;
