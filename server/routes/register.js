const bcrypt = require('bcrypt');
const express = require('express');
const validator = require('validator');
const User = require('../database/models/users');

const router = express.Router();

/**
 * Handle login requests
 */
router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = req.body;

  const username = validator.normalizeEmail(email);

  //* Validate input
  if (!firstName || !lastName || !username || !password || !confirmPassword) return res.status(400).json({ error: 'Missing field(s)' });
  if (!validator.isEmail(username)) return res.status(400).json({ error: 'Invalid email entered' });
  if (password !== confirmPassword) return res.status(400).json({ error: 'Passwords must match' });
  //* Validate strong password
  if (!/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%@&? "]).*$/.test(password)) return res.status(400).json({ error: 'Password must contain 8 characters and at least one number, one letter and one unique character' });

  //* Attempt to create the user
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      hashedPassword,
      firstName,
      lastName,
    });
    user.save();
    req.logIn(user, (err) => {
      if (err) return res.status(400).json({ error: 'Failed to create user.' });
      return res.json({
        user,
      });
    });

    // return res.status(201).json({ message: 'User created' });
  } catch (err) {
    return res.status(400).json({ error: 'Failed to create user.' });
  }
});

module.exports = router;
