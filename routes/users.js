const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Create one user
router.post('/signup', async (req, res) => {
  // Check if user already exists
  const isUser = await User.findOne({ email: req.body.email });
  if (isUser) return res.status(409).json({ message: 'User already exists' });
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//login page: storing and comparing email and password,and redirecting to home page after login
router.post('/signin', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result === false)
      return res.status(500).json({ message: 'Incorrect password' });
    res.status(200).json(user);
  });
});

// Update one user
router.patch('/update/:id', getUser, async (req, res) => {
  if (req.body.firstName) res.user.firstName = req.body.firstName;
  if (req.body.lastName) res.user.lastName = req.body.lastName;
  if (req.body.username) res.user.username = req.body.username;
  if (req.body.password) res.user.password = req.body.password;
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await User.deleteOne({ email: res.user.email });
    res.json({ message: 'User removed from the DB' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to be called for GET one, PATCH and DELETE requests
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.user = user;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

module.exports = router;
