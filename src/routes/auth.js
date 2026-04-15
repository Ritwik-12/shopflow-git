const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const user = await UserModel.create({ email, password, name });
  res.status(201).json({ message: 'User created', userId: user.id });
});

module.exports = router;
