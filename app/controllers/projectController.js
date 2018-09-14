const { Project, Document } = require('../models');

module.exports = {
  index(req, res) {
    return res.render('project');
  },

  async store(req, res, next) {
    try {
      const project = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Projeto Criado');

      return res.redirect(`/project/${project.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const documents = await Document.findAll({
        where: {
          ProjectId: req.params.id,
        },
      });

      return res.render('project', { documents, projectId: req.params.id });
    } catch (err) {
      return next(err);
    }
  },
};
