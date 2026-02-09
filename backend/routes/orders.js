const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place a new order
router.post('/place', async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items) {
    return res.status(400).json({ message: 'User ID and items are required' });
  }

  try {
    const newOrder = new Order({
      userId,
      items
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Order placement failed', error: error.message });
  }
});

module.exports = router;