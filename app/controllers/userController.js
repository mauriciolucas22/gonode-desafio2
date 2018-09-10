const { User } = require('../models');

module.exports = {
  login(req, res) {
    res.render('signin');
  },

  async index(req, res) {
    const users = await User.findAll();

    res.send(users);
  },
};
