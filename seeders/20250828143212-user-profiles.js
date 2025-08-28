'use strict';
const fs = require('fs').promises
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

    const userProfiles = JSON.parse(await fs.readFile('userprofiles.json', 'utf8'))
                        .map((uprofile) => {
                          delete uprofile.id
                          uprofile.createdAt = uprofile.updatedAt = new Date;
                          return uprofile
                        });

    await queryInterface.bulkInsert('UserProfiles', userProfiles)


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('UserProfiles', null)
  }
};
