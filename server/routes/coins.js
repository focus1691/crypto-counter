const express = require('express');
const validator = require('validator');
const User = require('../database/models/users');

const router = express.Router();

router.get('/', async (req, res) => res.status(200).json({ coins: req.user.coins }));

router.post('/', async (req, res) => {
  const {
    username, id, name, symbol, quantity, purchaseDate,
  } = req.body;

  if (!id || !name || !symbol) return res.status(400).send('Select a cryptocurrency');
  if ((typeof quanity === 'number') || (typeof quantity === 'string' && !validator.isNumeric(quantity))) return res.status(400).send('Quantity must be a number');

  const filter = { username };
  const user = await User.findOne(filter);

  if (user) {
    await user.coins.push({
      id, name, symbol, quantity, purchaseDate,
    });
    const newUser = await user.save();
    return res.status(201).json({ coins: newUser.coins });
  }
  return res.status(400).end();
});

module.exports = router;
