'use strict';

const { Review, ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-20445002/original/e4d0b62c-8f52-43e6-a1c8-70298122a1f8.jpeg?im_w=1440'
      },
      {
        reviewId: 2,
        url: 'https://a0.muscache.com/im/pictures/2499b885-3ef1-44c6-9139-584448d1fe68.jpg?im_w=1440'
      },
      {
        reviewId: 3,
        url: 'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt45998f4cccc40ff4/61810cb19dce4f6f63ede709/US_Philadelphia_US_Header.jpg?width=1440&quality=70&auto=webp'
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
