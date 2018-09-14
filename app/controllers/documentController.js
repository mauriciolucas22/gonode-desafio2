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
};
