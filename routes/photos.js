require('dotenv').config();
const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const isAuthorized = require('../helpers/authorize');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const storage = cloudinaryStorage({
  cloudinary,
  folder: 'meals',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});
const parser = multer({ storage });

router.post('/photo/upload/:id',isAuthorized, parser.single('image'), async (req, res) => {
  const photo = new Photo({
    url: req.file.url,
    mealId: req.params.id
  });
  await photo.save();
  res.status(201).json({ message: 'Photo successfully uploaded' });
});

module.exports = router;
