'use strict';

const { Booking } = require('../models');
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
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: '2024-02-14',
        endDate: '2024-02-17'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2024-03-21',
        endDate: '2024-03-24'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2024-01-03',
        endDate: '2024-01-05'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2024-05-05',
        endDate: '2024-05-09'
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
