'use strict';

const { SpotImage } = require('../models');
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
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: '/bag-end/bag-end-1.png',
        preview: true
      },
      {
        spotId: 1,
        url: '/bag-end/bag-end-2.png',
        preview: false
      },
      {
        spotId: 1,
        url: '/bag-end/bag-end-3.png',
        preview: false
      },
      {
        spotId: 1,
        url: '/bag-end/bag-end-4.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: '/rivendell/rivendell-1.png',
        preview: true
      },
      {
        spotId: 2,
        url: '/rivendell/rivendell-2.png',
        preview: false
      },
      {
        spotId: 2,
        url: '/rivendell/rivendell-3.png',
        preview: false
      },
      {
        spotId: 2,
        url: '/rivendell/rivendell-4.png',
        preview: false
      },
      {
        spotId: 2,
        url: '/rivendell/rivendell-5.png',
        preview: false
      },
      {
        spotId: 3,
        url: '/weathertop/weathertop-1.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://tolkiengateway.net/w/images/1/1a/Jef_Murray_-_Amon_S%C3%BBl.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: '/mines-of-moria/mines-of-moria-1.png',
        preview: true
      },
      {
        spotId: 4,
        url: '/mines-of-moria/mines-of-moria-2.png',
        preview: false
      },
      {
        spotId: 4,
        url: '/mines-of-moria/mines-of-moria-3.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      }, {
        spotId: 4,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: '/lothlorien/lothlorien-1.png',
        preview: true
      },
      {
        spotId: 5,
        url: '/lothlorien/lothlorien-2.png',
        preview: false
      },
      {
        spotId: 5,
        url: '/lothlorien/lothlorien-3.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: '/minas-tirith/minas-tirith-1.png',
        preview: true
      },
      {
        spotId: 6,
        url: '/minas-tirith/minas-tirith-2.png',
        preview: false
      },
      {
        spotId: 6,
        url: '/minas-tirith/minas-tirith-3.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: '/osgiliath/osgiliath-1.png',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/07/boromir_in_osgiliath-cropped.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: '/isengard/isengard-1.png',
        preview: true
      },
      {
        spotId: 8,
        url: '/isengard/isengard-2.png',
        preview: false
      },
      {
        spotId: 8,
        url: '/isengard/isengard-3.png',
        preview: false
      },
      {
        spotId: 8,
        url: '/isengard/isengard-4.png',
        preview: false
      },
      {
        spotId: 8,
        url: '/isengard/isengard-5.png',
        preview: false
      },
      {
        spotId: 9,
        url: '/barad-dur/barad-dur-1.png',
        preview: true
      },
      {
        spotId: 9,
        url: '/barad-dur/barad-dur-2.png',
        preview: false
      },
      {
        spotId: 9,
        url: '/barad-dur/barad-dur-3.png',
        preview: false
      },
      {
        spotId: 9,
        url: '/barad-dur/barad-dur-4.png',
        preview: false
      },
      {
        spotId: 9,
        url: '/barad-dur/barad-dur-5.png',
        preview: false
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {})
  }
};
