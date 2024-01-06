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
        url: 'https://static.wikia.nocookie.net/lotr/images/e/e4/Vlcsnap-2013-05-19-19h49m07s0.png/revision/latest/scale-to-width-down/1000?cb=20130519155935',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.pinimg.com/originals/90/53/0a/90530a9aa2f84a0a01ec522f8e9ebccf.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://static.wikia.nocookie.net/lotr/images/5/53/Rivendell_-_The_Hobbit.PNG/revision/latest?cb=20201223182505',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.msbarchitects.com/sites/default/files/frodo_bed_rivendell1-624x400.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://static.wikia.nocookie.net/lotr/images/2/2e/Weathertop%27s_view.png/revision/latest?cb=20130117111316',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://static.wikia.nocookie.net/middle-earth-film-saga/images/b/b7/Weathertop_-_AUJ.jpg/revision/latest?cb=20210610061140',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://64.media.tumblr.com/c12afecd701114d8c3476d6ece3dab23/tumblr_inline_nn6cv0uiIv1rnrk68_1280.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.giantbomb.com/a/uploads/scale_medium/0/118/795059-moria_gate_1024.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.etsystatic.com/20317338/r/il/b44279/3443441253/il_570xN.3443441253_9e73.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://static.wikia.nocookie.net/middle-earth-film-saga/images/4/4b/Lothlorien.jpg/revision/latest?cb=20210702185849',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.etsystatic.com/17727358/r/il/b7178a/3462596045/il_fullxfull.3462596045_3eyu.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://static.wikia.nocookie.net/lotr/images/0/0b/Seventh_level_of_Minas_Tirith.png/revision/latest?cb=20181024013412',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://static.wikia.nocookie.net/lotr/images/9/9a/BC1D3C88-4C27-4EEA-9973-FB4BEAF88D48.jpeg/revision/latest?cb=20200519171256',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/originals/cf/ae/68/cfae6834c20cee3cc5c24d3153325b81.png',
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
        spotId: 9,
        url: 'https://preview.redd.it/how-did-sauron-construct-barad-d%C3%BBr-what-was-the-timescale-v0-68nnm70z5yyb1.jpg?auto=webp&s=b692db0c9c424e7abec6c06d5e44cbc88ba7285d',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://static.wikia.nocookie.net/lotr/images/b/b8/Rebuilding_of_Barad-dur.jpg/revision/latest?cb=20130127060850',
        preview: false
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {})
  }
};
