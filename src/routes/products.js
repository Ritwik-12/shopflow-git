const express = require('express');
const router = express.Router();
const ProductService = require('../services/product.service');

router.get('/', async (req, res) => {
  const products = await ProductService.getAll();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await ProductService.getById(req.params.id);
  console.log("Error handler for new product addition");
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
