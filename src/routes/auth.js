// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const router = express.Router();

// Hardcoded user credentials
const demoUser = {
  username: 'admin',
  password: bcrypt.hashSync('admin123', 10) // Only hash once when setting up
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== demoUser.username) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, demoUser.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
