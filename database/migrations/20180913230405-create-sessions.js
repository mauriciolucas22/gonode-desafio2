module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Sessions', {
      sid: {
        // id da session
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      expires: DataTypes.DATE,

      data: DataTypes.TEXT,

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    queryInterface.dropTable('Sessions');
  },
};
