const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Comment = require('../models/Comment');
const Meal = require('../models/Meal');
const isAuthorized = require('../helpers/authorize');

// Add like to meal comment
router.post('/comment/like/:id', isAuthorized, getComment, async (req, res) => {
  try {
    if (res.comment.likes.includes(req.userId))
      res.status(400).json({ message: 'You already liked this comment' });
    res.comment.likes.push(req.userId);
    await res.comment.save();
    res.status(201).json({ message: 'Like added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove like from meal comment
router.get(
  '/comment/like/delete/:id',
  isAuthorized,
  getComment,
  async (req, res) => {
    if (!res.comment.likes.includes(req.userId))
      res.json({ message: "You didn't like this comment" });
    try {
      res.comment.likes.pull(req.userId);
      await res.comment.save();
      res.status(200).json({ message: 'Like successfully removed' });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
);

// Remove comment and comments in associated meal comments array
router.get(
  '/comment/delete/:id',
  isAuthorized,
  getComment,
  async (req, res) => {
    if (res.comment.postedBy.toString() !== req.userId.toString())
      return res
        .status(403)
        .json({ message: 'You are not the author of this comment.' });
    try {
      const commentId = mongoose.Types.ObjectId(res.comment._id.toString())
      const meal = await Meal.findOne({
        comments: commentId,
      });
      if (!meal) res.status(404).json({ message: 'Meal does not exist' });
      meal.comments.splice(meal.comments.indexOf(res.comment._id), 1);
      await meal.save()
      await Comment.findByIdAndRemove(res.comment._id);
      res.status(200).json({ message: 'Comment successfully removed' });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
);

async function getComment(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(400).json({ message: 'Comment not found' });
    }
    res.comment = comment;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
}

module.exports = router;
