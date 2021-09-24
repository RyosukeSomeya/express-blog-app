'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert('users', [
      { name: 'Taro Yamada', password: 'password', created_at: now, updated_at: now },
      { name: 'Jiro Yamada', password: 'password', created_at: now, updated_at: now  },
      { name: 'Hanako Yamada', password: 'password', created_at: now, updated_at: now  },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
