const bcrypt = require('bcryptjs');

const { User } = require('../models');

module.exports = {
  signin(req, res) {
    return res.render('signin');
  },

  signup(req, res) {
    return res.render('signup');
  },

  async register(req, res, next) {
    try {
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
    } catch (err) {
      return next(err);
    }
  },

  async authenticate(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash('error', 'Usuário inexistente');
        return res.redirect('/');
      }

      // compara senha
      if (!await bcrypt.compare(password, user.password)) {
        req.flash('error', 'Senha inválida');
        return res.redirect('/');
      }

      // salva na session
      req.session.user = user;

      return req.session.save(() => {
        res.redirect('dashboard');
      });
    } catch (err) {
      return next(err);
    }
  },

  signout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
