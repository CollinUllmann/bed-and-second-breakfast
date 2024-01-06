'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Frodo',
        lastName: 'Baggins',
        email: 'frodo@theonering.net',
        username: 'frodoswaggins',
        hashedPassword: bcrypt.hashSync('Und3rh1ll')
      },
      {
        firstName: 'Bilbo',
        lastName: 'Baggins',
        email: 'bilbo@shiremail.com',
        username: 'riddleslover',
        hashedPassword: bcrypt.hashSync('precious826')
      },
      {
        firstName: 'Gandalf',
        lastName: 'Mithrandir',
        email: 'gandalf@wizardry.com',
        username: 'grey_pilgrim',
        hashedPassword: bcrypt.hashSync('FlyYouF00ls!')
      },
      {
        firstName: 'Aragorn',
        lastName: 'Elessar',
        email: 'aragorn@kingdomofgondor.org',
        username: 'aragorn_crownedking',
        hashedPassword: bcrypt.hashSync('5tr1d3r')
      },
      {
        firstName: 'Peregrin',
        lastName: 'Took',
        email: 'pippin@thetooks.com',
        username: 'pipsqueak',
        hashedPassword: bcrypt.hashSync('br34kfast2')
      },
      {
        firstName: 'Meriadoc',
        lastName: 'Brandybuck',
        email: 'merry@shiremail.com',
        username: 'big_smoke',
        hashedPassword: bcrypt.hashSync('TookishAdventures')
      },
      {
        firstName: 'Saruman',
        lastName: 'White',
        email: 'saruman@wizardry.com',
        username: 'saruman_the_white',
        hashedPassword: bcrypt.hashSync('i<3hobb1ts')
      },
      {
        firstName: 'Galadriel',
        lastName: 'Finarfin',
        email: 'galadriel@lothlorien.org',
        username: 'lady_of_lorien',
        hashedPassword: bcrypt.hashSync('NenyaBusiness')
      },
      {
        firstName: 'Sauron',
        lastName: 'Morgoth',
        email: 'sauron@theonering.net',
        username: 'xxxdarklordxxx',
        hashedPassword: bcrypt.hashSync('m0rg0thF4n')
      },
      {
        firstName: 'Elrond',
        lastName: 'Half-elven',
        email: 'elrond@rivendell.org',
        username: 'elrond_half_elven',
        hashedPassword: bcrypt.hashSync('ChillinLikeaVilyan', 10)
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['frodoswaggins', 'riddleslover', 'grey_pilgrim', 'aragorn_crownedking', 'pipsqueak', 'big_smoke', 'saruman_the_white', 'lady_of_lorien', 'xxxdarklordxxx', 'elrond_half_elven'] }
    }, {});
  }
};