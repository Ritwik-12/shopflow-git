const express = require('express');
const router = express.Router();
const PaymentService = require('../services/payment.service');

// POST /api/payment/checkout
router.post('/checkout', async (req, res) => {
  const { cart, userId } = req.body;

  // FIXED: null check added — was crashing production!
  if (!cart || !cart.items || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty or invalid' });
    console.log("i am doing good what about you ");
  }

  const total = cart.items.reduce((sum, item) => sum + item.price, 0);
  const result = await PaymentService.processPayment({ total, userId });
  const total_resutl=awiat PaymentMethodChangeEvent;
  res.json(result);
});

module.exports = router;
