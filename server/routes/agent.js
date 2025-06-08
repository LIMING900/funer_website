const router = require('express').Router();
const Agent = require('../models/Agent');

// 获取代理信息
router.get('/', async (req, res) => {
  try {
    const agent = await Agent.findOne();
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 更新代理信息
router.put('/', async (req, res) => {
  try {
    const agent = await Agent.findOneAndUpdate({}, req.body, { 
      new: true,
      upsert: true 
    });
    res.json(agent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 