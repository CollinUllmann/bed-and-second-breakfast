const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { isEmail } = require('validator');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;

  let validationErrors = {};
  if (!email || !isEmail(email)) validationErrors.email = "Invalid email"

  if (!username) validationErrors.username = "Username is required"

  if (username.length < 4) validationErrors.username = "Please provide a username with at least 4 characters"

  if (isEmail(username)) validationErrors.username = "Username cannot be an email"

  if (!password || password.length < 6) validationErrors.password = "Password must be 6 characters or more"

  if (!firstName) validationErrors.firstName = "First Name is required"

  if (!lastName) validationErrors.lastName = "Last Name is required"

  if (Object.keys(validationErrors).length > 0) {
    res.statusCode = 400;
    return res.json({
      message: "Bad Request",
      errors: validationErrors
    })
  }


  let existingUserByEmail = await User.findOne({
    where: {
      email: email
    }
  })

  let alreadyExistsErrors = {};
  if (existingUserByEmail) {
    alreadyExistsErrors.email = "User with that email already exists"
  }

  let existingUserByUsername = await User.findOne({
    where: {
      username: username
    }
  })

  if (existingUserByUsername) {
    alreadyExistsErrors.username = "User with that username already exists"
  }

  if (Object.keys(alreadyExistsErrors).length > 0) {
    res.statusCode = 500;
    return res.json({
      message: "User already exists",
      errors: alreadyExistsErrors
    })
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, username, hashedPassword, firstName, lastName });

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
  })
});



module.exports = router;
