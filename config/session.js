const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // usado para criar session no banco
const { sequelize } = require('../app/models'); // conexão do banco

module.exports = {
  secret: 'jesus',
  resave: false,
  saveUninitialized: false, // cria session somente quando user logar, true fica criando registros mesmo se user não logar
  store: new SequelizeStore({
    db: sequelize, // cria session no banco
  }),
};
