const express = require('express');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { createProduct, getaProduct, getAllProducts, updateaProduct, deleteaProduct, addToWishlist, rating, uploadImages } = require('../controller/productCtrl');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.get('/:id', getaProduct);
router.put('/whishlist', authMiddleware, addToWishlist);
router.put('/rating', authMiddleware, rating);

router.put('/:id',authMiddleware, isAdmin, updateaProduct);
router.delete('/:id',authMiddleware, isAdmin, deleteaProduct);
router.get('/', getAllProducts);


module.exports = router;