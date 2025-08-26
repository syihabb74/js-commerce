'use strict';
const fs = require('fs').promises;

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

    const products = JSON.parse(await fs.readFile('products.json', 'utf8'))
                    .map((product) => {
                      delete product.id;
                      product.createdAt = product.updatedAt = new Date();
                      return product
                    });


    await queryInterface.bulkInsert('Products', products)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Products', null, {});
  }
};
