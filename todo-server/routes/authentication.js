const express = require('express');
const router = express.Router();
const { users } = require('../data/tasks&users');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ email: user.email });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const userExists = users.some(u => u.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).json({ email: newUser.email });
});

module.exports = router;
