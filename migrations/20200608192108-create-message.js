'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allownull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key: 'id'
        }
      },
      title: {
        allownull: false,
        type: Sequelize.STRING
      },
      content: {
        allownull: false,
        type: Sequelize.STRING
      },
      attachement: {
        allownull: true,
        type: Sequelize.STRING
      },
      likes: {
        allownull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};