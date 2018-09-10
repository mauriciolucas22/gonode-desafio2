const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();

const routes = require('./app/routes');

const PORT = 3000;
const HOST = '127.0.0.1';

// const { User } = require('./app/models');

/* User.create({
  name: 'Jesus',
  email: 'jesus@jesus.com',
  password: '123',
}); */

nunjucks.configure(path.resolve('app', 'views'), {
  autoescape: true,
  express: app,
});

app.set('view engine', 'html');
app.use(express.static(path.resolve('app', 'views')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(PORT, HOST);
