module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  Document.associate = (models) => {
    Document.belongsTo(models.Project);
  };

  return Document;
};
