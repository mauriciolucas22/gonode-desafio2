const md = require('markdown-it')();

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {
    // cria novos campos pro model
    getterMethods: {
      excerpt() {
        // this => se refere ao document que estiver acessando o excerpt
        return this.title.length > 20
          ? `${this.title.substring(0, 20)} ...`
          : this.title;
      },

      // transforma o conteudo do markdown em HTML
      formattedContent() {
        return md.render(this.content);
      },
    },
  });

  Document.associate = (models) => {
    Document.belongsTo(models.Project);
  };

  return Document;
};
