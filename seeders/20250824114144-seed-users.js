'use strict';
const fs = require('fs').promises;
const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */




    const users = JSON.parse(await fs.readFile('users.json', 'utf8'))
                  .map((user) => {
                    delete user.id ;
                    user.createdAt = user.updatedAt = new Date();
                    user.role = 'user';
                    user.balance = 0;
                    const salt = bcryptjs.genSaltSync(10);
                    const hash = bcryptjs.hashSync(user.password, salt);
                    user.password = hash
                    return user
                  })

    await queryInterface.bulkInsert('Users', users)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null)

  }
};
