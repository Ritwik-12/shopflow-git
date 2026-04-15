const express = require('express');
const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const paymentRoutes = require('./routes/payment');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(3000, () => console.log('ShopFlow running on port 3000'));
module.exports = app;
