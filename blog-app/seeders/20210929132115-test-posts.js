'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Posts', [
      {
        title: 'テスト投稿1',
        content: 'テスト投稿1テキスト',
        userId: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'テスト投稿2',
        content: 'テスト投稿2テキスト',
        userId: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'テスト投稿3',
        content: 'テスト投稿3テキスト',
        userId: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'テスト投稿4',
        content: 'テスト投稿4テキスト',
        userId: 3,
        createdAt: now,
        updatedAt: now
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
