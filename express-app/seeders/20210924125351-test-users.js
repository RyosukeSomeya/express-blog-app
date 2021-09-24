'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Users', [
      { name: '山田太郎',  email: 'taro@example.com', password: 'taro-password', createdAt: now, updatedAt: now},
      { name: '山田次郎',  email: 'jiro@example.com', password: 'jiro-password', createdAt: now, updatedAt: now},
      { name: '山田花子',  email: 'saburo@example.com', password: 'hanako-password', createdAt: now, updatedAt: now},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
