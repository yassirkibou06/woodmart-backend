const express = require('express');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhotos, productImageResize } = require('../middlewares/uploadimages');
const { createProduct, getaProduct, getAllProducts, updateaProduct, deleteaProduct, addToWishlist, rating, uploadImages } = require('../controller/productCtrl');


const router = express.Router();
/*
router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhotos.array('images', 10), productImageResize, uploadImages);
router.get('/:id', getaProduct);
router.put('/whishlist', authMiddleware, addToWishlist);
router.put('/rating', authMiddleware, rating);

router.put('/:id',authMiddleware, isAdmin, updateaProduct);
router.delete('/:id',authMiddleware, isAdmin, deleteaProduct);*/

router.get('/', getAllProducts, async (req, res) => {
    try {
        // Your existing code for creating a product
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;