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

    const orderitems = JSON.parse(await fs.readFile('orderitems.json', 'utf-8'))
                      .map((orderitem) => {
                        delete orderitem.id;
                        orderitem.createdAt = orderitem.updatedAt = new Date()
                        return orderitem
                      });

  await queryInterface.bulkInsert('OrderItems', orderitems)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
