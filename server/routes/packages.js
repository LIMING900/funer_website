const router = require('express').Router();
const Package = require('../models/Package');

// 获取所有套餐
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 添加新套餐
router.post('/', async (req, res) => {
  const package = new Package({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  });

  try {
    const newPackage = await package.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 