const { Document, Project } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { projectId } = req.params;

      const document = await Document.create({
        ...req.body,
        content: '',
        ProjectId: projectId,
      });

      req.flash('success', 'Documento criado');

      return res.redirect(`/project/${projectId}/document/${document.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { projectId, id } = req.params;

      // obtem os documentos desse projeto
      const currentDocument = await Document.findById(id);

      // todos os docs
      const documents = await Document.findAll({
        where: { ProjectId: projectId },
      });

      // projeto
      const project = await Project.find({
        where: {
          id: projectId,
        },
      });

      return res.render('project', {
        currentDocument,
        documents,
        projectId,
        projectTitle: project.title,
        userName: req.session.user.name,
        activeDocument: currentDocument.id,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      // busca o documento
      const document = await Document.findById(req.params.id);

      // atualiza o conteudo
      await document.update(req.body);

      // envia msg
      req.flash('success', 'Documento atualizado!');

      // redireciona para page do doc
      return res.redirect(`/project/${req.params.projectId}/document/${document.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Document.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.redirect(`/project/${req.params.projectId}`);
    } catch (err) {
      return next(err);
    }
  },
};
