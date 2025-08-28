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

    const orders = JSON.parse(await fs.readFile('orders.json', 'utf-8'))
                      .map((order) => {
                        delete order.id;
                        delete order.status;
                        delete order.paymentMethod;
                        order.orderDate = order.createdAt = order.updatedAt = new Date()
                        return order
                      });

  await queryInterface.bulkInsert('Orders', orders)

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
