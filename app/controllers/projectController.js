const { Project } = require('../models');

module.exports = {
  index(req, res) {
    return res.render('project');
  },

  async store(req, res, next) {
    try {
      await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Projeto Criado');

      return res.redirect('/project');
    } catch (err) {
      return next(err);
    }
  },
};
