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

// POST /api/auth/login  — WORK IN PROGRESS
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // TODO: validate inputs
  // TODO: compare hashed password
  // TODO: generate JWT
  res.json({ message: 'WIP - not done yet' });
});

// helper (remove this later)
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
