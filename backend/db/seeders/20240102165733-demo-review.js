'use strict';

const { Review } = require('../models');
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
    await Review.bulkCreate([
      {
        spotId: 4, //Mines of Moria
        userId: 5, // Pippin
        review: "I did an oopsie",
        stars: 2
      },
      {
        spotId: 1, //Bag End
        userId: 9, // Sauron
        review: "Not dark enough, too much happiness and merriment in this hobbit hole.",
        stars: 1
      },
      {
        spotId: 9, // Barad-dur
        userId: 1, // Frodo
        review: "Neighbors were a bit much.",
        stars: 1
      },
      {
        spotId: 8, //Orthanc
        userId: 6, // Merry
        review: "Impressive architecture, it'll have a bit of a face lift under new management.",
        stars: 3
      },
      {
        spotId: 5, // Lothlorien
        userId: 2, // Bilbo
        review: "Absolutely beautiful, filled with wonder and tranquility.",
        stars: 5
      },
      {
        spotId: 2, //Rivendell
        userId: 2, // Bilbo
        review: "A charming haven with lovely scenery, perfect for an old hobbit's retirement.",
        stars: 5
      },
      {
        spotId: 2, // Rivendell
        userId: 3, // Gandalf
        review: "A refuge of peace and wisdom.",
        stars: 4
      },
      {
        spotId: 1, // Bag End
        userId: 3, // Gandalf
        review: "A delightful abode filled with cheer and laughter. Tea with hobbits is always a pleasure.",
        stars: 5
      },
      {
        spotId: 4, // Mines of Moria
        userId: 7, // Saruman
        review: "Impressive dwarven craftsmanship.",
        stars: 4
      },
      {
        spotId: 8, // Orthanc
        userId: 8, // Galadriel
        review: "An imposing tower, yet lacks the elegance of the golden woods of Lothlorien.",
        stars: 2
      },
      {
        spotId: 7, // Osgiliath
        userId: 5, // Pippin
        review: "Could use a comfy tavern!",
        stars: 2
      },
      {
        spotId: 9, // Barad-dur
        userId: 10, // Elrond
        review: "An ominous fortress, best admired from afar. Not on my list of holiday destinations.",
        stars: 2
      },
      {
        spotId: 7, // Osgiliath
        userId: 10, // Elrond
        review: "Ruins with a haunting beauty, whispers of the past echoing in every stone.",
        stars: 3
      },
      {
        spotId: 1, // Bag End
        userId: 6, // Merry
        review: "Best tea and cakes in the Shire!",
        stars: 4
      },
      {
        spotId: 6, // Minas Tirith
        userId: 8, // Galadriel
        review: "A city of strength and hope, yet lacking in elven grace. Worth a visit nonetheless.",
        stars: 3
      },
      {
        spotId: 3, // Weathertop
        userId: 1, // Frodo
        review: "A bit stabby for my taste",
        stars: 1
      },
      {
        spotId: 3, // Weathertop
        userId: 9, // Sauron
        review: "Just follow the smell of bacon",
        stars: 3
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {})
  }
};
