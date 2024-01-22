const express = require('express');
const { createProduct, getaProduct, getAllProducts, updateaProduct, deleteaProduct, addToWishlist, rating, uploadImages } = require('../controller/productCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhotos, productImageResize } = require('../middlewares/uploadImages');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhotos.array('images', 10), productImageResize, uploadImages);
router.get('/:id', getaProduct);
router.put('/whishlist', authMiddleware, addToWishlist);
router.put('/rating', authMiddleware, rating);

router.put('/:id',authMiddleware, isAdmin, updateaProduct);
router.delete('/:id',authMiddleware, isAdmin, deleteaProduct);
router.get('/', getAllProducts);


module.exports = router