const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const router = express.Router();

//log in a user
router.post('/', async (req, res, next) => {
  const { credential, password } = req.body;

  let credentialErrors = {};
  if (!credential) {
    credentialErrors.credential = 'Please provide a valid email or username'
  }

  if (!password) {
    credentialErrors.password = 'Please provide a password'
  }

  if (Object.keys(credentialErrors).length > 0) {
    res.statusCode = 400;
    return res.json({
      message: "Bad Request",
      errors: credentialErrors
    })
  }

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential
      }
    }
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    res.statusCode = 401;
    return res.json({
      message: "Invalid credentials"
    })
  }

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser
  });
}
);

//log out the current user
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
}
);

//get the current user
router.get('/', (req, res) => {
  const { user } = req;
  console.log('user: ', user)
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return res.json({
      user: safeUser
    });
  } else return res.json({ user: null });
}
);




module.exports = router;