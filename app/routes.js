const express = require('express');

const routes = express.Router();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

routes.get('/', userController.login);
routes.get('/login', userController.index);

routes.post('/register', authController.register);

module.exports = routes;
