const express = require('express');
const { getProducts, addProducts } = require('../controllers/products');

const router = express.Router();

router.get('/', getProducts);
router.post('/add', addProducts);


module.exports = router;
