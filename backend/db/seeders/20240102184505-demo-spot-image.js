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
        url: 'https://artistmonkeys.com/wp-content/uploads/2023/09/Rivendell-beautiful-landscape-2.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.msbarchitects.com/sites/default/files/frodo_bed_rivendell1-624x400.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://pm1.aminoapps.com/6598/64df5f0c151112e7cd202668b40d7bc3f21656a9_00.jpg',
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
        url: 'https://i.pinimg.com/originals/cf/ae/68/cfae6834c20cee3cc5c24d3153325b81.png',
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
        url: 'https://cdnb.artstation.com/p/assets/images/images/052/862/963/large/rogari-isengard14-shopped.jpg?1660842261',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/originals/d4/95/3e/d4953ed041cdf5d9240e1e9d911a7348.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://preview.redd.it/how-did-sauron-construct-barad-d%C3%BBr-what-was-the-timescale-v0-68nnm70z5yyb1.jpg?auto=webp&s=b692db0c9c424e7abec6c06d5e44cbc88ba7285d',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://i.pinimg.com/originals/22/12/2b/22122b723279cb255df3d25103ded54e.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.pinimg.com/736x/58/2f/d3/582fd3d4d5229988180ad05622fb4c87.jpg',
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
