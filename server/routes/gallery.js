const router = require('express').Router();
const Gallery = require('../models/Gallery');

// 获取所有图片
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 添加新图片
router.post('/', async (req, res) => {
  const image = new Gallery({
    thumbnail: req.body.thumbnail,
    full: req.body.full,
    description: req.body.description
  });

  try {
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 