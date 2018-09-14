module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ProjectId: {
        type: DataTypes.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    // deleta tabela
    queryInterface.dropTable('Documents');
  },
};
