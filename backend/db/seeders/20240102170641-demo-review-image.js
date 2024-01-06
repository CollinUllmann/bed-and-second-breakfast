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
        reviewId: 7,
        url: 'https://i.redd.it/jwkgxcicnnv91.jpg'
      },
      {
        reviewId: 8,
        url: 'https://i.ytimg.com/vi/ab-iVi2WbW0/maxresdefault.jpg'
      },
      {
        reviewId: 16,
        url: 'https://static.wikia.nocookie.net/lotr/images/1/14/Frodo_Baggins_Stabbed.png/revision/latest?cb=20181014232238'
      },
      {
        reviewId: 4,
        url: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/03/lotr-merrypippin.jpg'
      },
      {
        reviewId: 1,
        url: 'https://i.stack.imgur.com/nyo7F.jpg'
      },
      {
        reviewId: 6,
        url: 'https://m.media-amazon.com/images/M/MV5BYTA3NGU2NzItZmYzYy00M2EzLWEyYjgtODU4MjMzMWZlMDQzXkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg'
      },
      {
        reviewId: 3,
        url: 'https://pbs.twimg.com/media/EfZTPvsVAAEr3WG.jpg'
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
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {})
  }
};
