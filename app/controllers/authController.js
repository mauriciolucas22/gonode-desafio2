const bcrypt = require('bcryptjs');

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
      req.flash('error', 'Email já cadastrado');
      return res.redirect('back');
    }

    // criptogafa senha
    const password = await bcrypt.hash(req.body.password, 5);

    await User.create({
      ...req.body,
      password,
    });

    req.flash('success', 'Usuário cadastrado');
    return res.redirect('/');
  },
};
