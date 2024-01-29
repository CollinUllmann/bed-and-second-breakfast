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
        ownerId: 2,
        address: '1 Bag End Dr',
        city: 'Hobbiton',
        state: 'The Shire',
        country: 'Middle-earth',
        lat: -37.9136,
        lng: 175.4786,
        name: 'Bag End',
        description: 'Charming hobbit hole with a round door. No visitors except on party business.',
        price: 80
      },
      {
        ownerId: 10,
        address: '777 Last Homely House Ct',
        city: 'Imladris',
        state: 'Eriador',
        country: 'Middle-earth',
        lat: 39.2041,
        lng: -106.8370,
        name: 'Rivendell',
        description: 'Serene elven refuge nestled amidst beautiful waterfalls. The ideal get away.',
        price: 120
      },
      {
        ownerId: 4,
        address: '1068 Summit Circle',
        city: 'Amon Sul',
        state: 'Eriador',
        country: 'Middle-earth',
        lat: 39.7036,
        lng: -105.4955,
        name: 'Weathertop',
        description: 'Scenic ancient ruins. Great spot for a picnic at sunset!',
        price: 90
      },
      {
        ownerId: 9,
        address: '666 Caradhras Point',
        city: 'Khazad-dum',
        state: 'Eriador',
        country: 'Middle-earth',
        lat: 56.1317,
        lng: -3.9403,
        name: 'Mines of Moria',
        description: 'Historical dwarven kingdom turned adventurous underground escape room.',
        price: 100
      },
      {
        ownerId: 8,
        address: '246 Lothlorien Ave',
        city: 'Caras Galadhon',
        state: 'Lothlorien',
        country: 'Middle-earth',
        lat: 47.6062,
        lng: -122.3321,
        name: 'Lothlorien',
        description: 'Enchanting treetop city, home to graceful elves. Experience treehouse living!',
        price: 150
      },
      {
        ownerId: 4,
        address: '751 Citadel Way',
        city: 'Minas Tirith',
        state: 'Gondor',
        country: 'Middle-earth',
        lat: 51.4545,
        lng: -2.5879,
        name: 'Minas Tirith',
        description: 'Historic seven-tiered city with breathtaking views.',
        price: 160
      },
      {
        ownerId: 4,
        address: '583 Kingly Ct',
        city: 'Osgiliath',
        state: 'Gondor',
        country: 'Middle-earth',
        lat: 51.5074,
        lng: -0.1278,
        name: 'Osgiliath',
        description: 'Once a great city, now a picturesque riverside spot.',
        price: 90
      },
      {
        ownerId: 7,
        address: '1 Saruman Circle',
        city: 'Isengard',
        state: 'Enedwaith',
        country: 'Middle-earth',
        lat: 43.7711,
        lng: 11.2486,
        name: 'Orthanc',
        description: 'Impressive black tower offering unparalleled views of Fangorn Forest.',
        price: 120
      },
      {
        ownerId: 9,
        address: '30 miles east of Mount Doom',
        city: 'Gorgoroth',
        state: 'Mordor',
        country: 'Middle-earth',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Barad-dur',
        description: 'Iconic dark fortress with stunning volcanic views. Ideal for world domination enthusiasts!',
        price: 180
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
      name: { [Op.in]: ['Bag End', 'Rivendell', 'Weathertop', 'Mines of Moria', 'Lothlorien', 'Minas Tirith', 'Osgiliath', 'Orthanc', 'Barad-dur'] }
    }, {})
  }
};
