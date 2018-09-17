const { Project, Document, User } = require('../models');

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

      const project = await Project.find({
        where: {
          id: req.params.id,
        },
      });

      return res.render('project', {
        documents,
        projectId: req.params.id,
        projectTitle: project.title,
        userName: req.session.user.name,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { projectId } = req.params;

      // busca o projecto
      const project = await Project.findById(projectId);

      // atualiza
      await project.update(req.body);

      // envia msg
      req.flash('success', 'Projeto atualizado');

      return res.redirect(`/project/${projectId}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Project.destroy({
        where: {
          id: req.params.projectId,
        },
      });

      return res.redirect('/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
