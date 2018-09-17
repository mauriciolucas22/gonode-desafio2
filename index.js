const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();

const routes = require('./app/routes');
const sessionConfig = require('./config/session');

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

app.set('view engine', 'njk');
app.use(express.static(path.resolve('app', 'views')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));
app.use(flash());
app.use(methodOverride('_method'));

app.use('/', routes);

app.listen(PORT, HOST);
