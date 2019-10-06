require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
let session = require('express-session');
const VerifyToken = require('../helpers/verify-token');
const isAuthorized = require('../helpers/authorize');

// Get all users
router.get('/users', isAuthorized, async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Create one user
router.post('/register', async (req, res) => {
  const isUser = await User.findOne({ email: req.body.email });
  if (isUser) return res.status(409).json({ message: 'User already exists' });
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    role: req.body.role,
  });
  try {
    await user.save();
    res.status(201).json({ message: 'Account created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//login page: storing and comparing email and password,and redirecting to home page after login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  bcrypt.compare(req.body.password, user.password, (_, result) => {
    if (result === false)
      return res
        .status(401)
        .json({ auth: false, token: null, message: 'Incorrect password' });
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 86400,
    });
    session.token = token;
    res.status(200).json({ auth: true, token });
  });
});

// Get information about oneself
router.get('/users/profile', isAuthorized, (req, res) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err)
      return res
        .status(500)
        .json({ message: 'There was a problem finding the user.' });
    if (!user) return res.status(404).json({ message: 'No user found.' });
    res.status(200).send(user);
  });
});

// Logout user
router.get('/users/logout', (req, res) => {
  req.session.destroy();
  delete session.token;
  res.status(200).json({ auth: null, message: 'Disconnected' });
});

// Get one user
router.get('/users/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Update one user
router.patch('/users/update/:id', isAuthorized, getUser, async (req, res) => {
  if (req.body.firstName) res.user.firstName = req.body.firstName;
  if (req.body.lastName) res.user.lastName = req.body.lastName;
  if (req.body.username) {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(409).json({ message: 'Username is already taken' });
    res.user.username = req.body.username;
  }
  if (req.body.password) {
    const hashedPassword = bcrypt.hash(req.body.password);
    res.user.password = hashedPassword;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete one user
router.delete('/users/delete/:id', getUser, async (req, res) => {
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
