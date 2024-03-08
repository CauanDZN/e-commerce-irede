const express = require('express');
const router = express.Router();
const { getProducts, getHighlightedProducts, getProductCategories } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/highlighteds', getHighlightedProducts);
router.get('/categories', getProductCategories);

module.exports = router;
