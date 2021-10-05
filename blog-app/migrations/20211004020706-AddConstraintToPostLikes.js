'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return Promise.all([
      queryInterface.addConstraint('PostLikes', {
        type: 'foreign key', // 外部キー制約の追加
        fields: ['postId'],   // postIdはPostsに存在するIDでないと行けない。
        name: 'fk_postlikes',
        references: {
          table: 'Posts',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeConstraint('PostLikes', 'fk_postlikes');
  }
};
