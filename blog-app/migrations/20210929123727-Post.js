'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Posts', 'userId', {
        type: Sequelize.INTEGER,
        after: 'content'
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    // Users.address, Users.ageを削除
    return Promise.all([
      queryInterface.removeColumn('Posts', 'userId'),
    ]);
  }
};
