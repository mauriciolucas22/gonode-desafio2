const { Project, User } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        where: {
          UserId: req.session.user.id,
        },
      });

      const user = await User.find({
        where: {
          id: req.session.user.id,
        },
      });

      return res.render('dashboard', { projects, user });
    } catch (err) {
      return next(err);
    }
  },
};
