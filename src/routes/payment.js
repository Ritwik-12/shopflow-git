const express = require('express');
const router = express.Router();
const PaymentService = require('../services/payment.service');

// POST /api/payment/checkout
router.post('/checkout', async (req, res) => {
  const { cart, userId } = req.body;

  // BUG: No null check on cart — crashes if cart is undefined!
  const total = cart.items.reduce((sum, item) => sum + item.price, 0);

  const result = await PaymentService.processPayment({ total, userId });
  res.json(result);
});

module.exports = router;
