const express = require('express');
const { getProducts, addProducts } = require('../controllers/products.js');
const { loginUser } = require('../controllers/user.js');

const router = express.Router();

router.get('/', getProducts);
router.post('/add', addProducts);
router.post('/login', loginUser);


module.exports = router;
