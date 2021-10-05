'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('PostLikes', [
      {
        postId: 1,
        userId: 2,
        createdAt: now,
        updatedAt: now
      },
      {
        postId: 1,
        userId: 3,
        createdAt: now,
        updatedAt: now
      },
      {
        postId: 2,
        userId: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        postId: 3,
        userId: 2,
        createdAt: now,
        updatedAt: now
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PostLikes', null, {});

  }
};
