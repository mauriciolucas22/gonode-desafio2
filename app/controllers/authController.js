const { User } = require('../models');

module.exports = {
  signin(req, res) {
    return res.render('signin');
  },

  signup(req, res) {
    return res.render('signup');
  },

  async register(req, res) {
    const { email } = req.body;

    // verifica se email já existe
    if (await User.findOne({ where: { email } })) {
      return res.redirect('back');
    }

    await User.create(req.body);

    return res.redirect('/');
  },
};
