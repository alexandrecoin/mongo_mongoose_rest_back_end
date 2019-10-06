const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const Comment = require('../models/Comment');
const isAuthorized = require('../helpers/authorize');

// Get all meals
router.get('/meals', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one meal
router.get('/meals/:id', getMeal, (req, res) => {
  res.json(res.meal);
});

// Create one meal
router.post('/meals/add', isAuthorized, async (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    createdBy: req.userId,
  });
  try {
    const newMeal = await meal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one meal
router.patch('/meals/update/:id', isAuthorized, getMeal, async (req, res) => {
  if (req.body.name) {
    res.meal.name = req.body.name;
  }
  try {
    const updatedMeal = await res.meal.save();
    res.json(updatedMeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create comment on meal
router.post('/meals/comment/:id', isAuthorized, getMeal, async (req, res) => {
  const comment = new Comment({
    postedBy: req.userId,
    description: req.body.description,
  });
  const newComment = await comment.save();
  res.meal.comments.push(newComment._id);
  await res.meal.save()
  res.status(201).json({ message: 'Comment added' });
});

// Delete one meal
router.delete('/meals/delete/:id', isAuthorized, getMeal, async (req, res) => {
  try {
    await res.meal.remove();
    res.json({ message: 'Meal removed from the DB' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to be called for GET one, PATCH and DELETE requests

async function getMeal(req, res, next) {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(400).json({ message: 'Meal not found' });
    }
    res.meal = meal;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

module.exports = router;
