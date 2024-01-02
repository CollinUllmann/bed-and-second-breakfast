'use strict';

const { Spot } = require('../models');
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
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '457 Sierra Vista Ave',
        city: 'Mountain View',
        state: 'CA',
        country: 'United States',
        lat: 37.40833827970457,
        lng: -122.08898365660286,
        name: 'Google Playground',
        description: 'This apartment is, according to Google Maps, located near Google headquarters so it probably costs a lot of money.',
        price: 625.00
      },
      {
        ownerId: 2,
        address: '1327 H St Unit 206',
        city: 'Las Vegas',
        state: 'NV',
        country: 'United States',
        lat: 36.18573519522409,
        lng: -115.15283616195674,
        name: 'Vegas Apartments',
        description: 'I went to Vegas and bought the first apartment I saw. This is it. Pay me money.',
        price: 850.00
      },
      {
        ownerId: 3,
        address: '1634-38 Lombard St',
        city: 'Philadelphia',
        state: 'PA',
        country: 'United States',
        lat: 39.945367545139604,
        lng: -75.16830362982286,
        name: 'Apartment of Brotherly Love',
        description: 'It ain\'t much, but it\'s mine. Give me money.',
        price: 500.00
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Google Playground', 'Vegas Apartments', 'Apartment of Brotherly Love'] }
    }, {})
  }
};
