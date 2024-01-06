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
        userId: 3,
        startDate: '2024-05-05',
        endDate: '2024-05-09'
      },
      {
        spotId: 1,
        userId: 8,
        startDate: '2024-07-10',
        endDate: '2024-07-14'
      },
      {
        spotId: 1,
        userId: 4,
        startDate: '2024-08-01',
        endDate: '2024-08-02'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2024-02-07',
        endDate: '2024-02-13'
      },
      {
        spotId: 2,
        userId: 5,
        startDate: '2024-06-05',
        endDate: '2024-06-10'
      },
      {
        spotId: 2,
        userId: 6,
        startDate: '2024-06-11',
        endDate: '2024-06-15'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2024-03-05',
        endDate: '2024-04-12'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2024-07-11',
        endDate: '2024-07-12'
      },
      {
        spotId: 3,
        userId: 7,
        startDate: '2024-11-03',
        endDate: '2024-11-05'
      },
      {
        spotId: 3,
        userId: 8,
        startDate: '2024-05-24',
        endDate: '2024-05-27'
      },
      {
        spotId: 4,
        userId: 10,
        startDate: '2024-10-28',
        endDate: '2024-11-01'
      },
      {
        spotId: 4,
        userId: 3,
        startDate: '2024-09-18',
        endDate: '2024-09-22'
      },
      {
        spotId: 4,
        userId: 4,
        startDate: '2024-12-02',
        endDate: '2024-12-10'
      },
      {
        spotId: 5,
        userId: 10,
        startDate: '2024-07-04',
        endDate: '2024-07-11'
      },
      {
        spotId: 5,
        userId: 7,
        startDate: '2024-03-26',
        endDate: '2024-03-28'
      },
      {
        spotId: 5,
        userId: 4,
        startDate: '2024-05-12',
        endDate: '2024-05-16'
      },
      {
        spotId: 6,
        userId: 1,
        startDate: '2024-12-23',
        endDate: '2024-12-28'
      },
      {
        spotId: 6,
        userId: 9,
        startDate: '2024-08-11',
        endDate: '2024-08-13'
      },
      {
        spotId: 6,
        userId: 6,
        startDate: '2024-04-18',
        endDate: '2024-04-25'
      },
      {
        spotId: 7,
        userId: 2,
        startDate: '2024-02-19',
        endDate: '2024-02-22'
      },
      {
        spotId: 7,
        userId: 7,
        startDate: '2024-06-05',
        endDate: '2024-06-09'
      },
      {
        spotId: 7,
        userId: 8,
        startDate: '2024-11-11',
        endDate: '2024-11-15'
      },
      {
        spotId: 8,
        userId: 4,
        startDate: '2024-08-01',
        endDate: '2024-08-03'
      },
      {
        spotId: 8,
        userId: 3,
        startDate: '2024-10-09',
        endDate: '2024-10-10'
      },
      {
        spotId: 8,
        userId: 8,
        startDate: '2024-05-16',
        endDate: '2024-05-19'
      },
      {
        spotId: 9,
        userId: 3,
        startDate: '2024-07-08',
        endDate: '2024-07-10'
      },
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {})
  }
};
