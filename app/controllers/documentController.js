const { Document } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { projectId } = req.params;

      const document = await Document.create({
        ...req.body,
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

      // pbtem os documentos desse projeto
      const document = await Document.findById(id);

      // todos os docs
      const documents = await Document.findAll({
        where: { ProjectId: projectId },
      });

      return res.render('project', {
        document,
        documents,
        projectId,
        activeDocument: document.id,
      });
    } catch (err) {
      return next(err);
    }
  },
};
