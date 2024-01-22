const express = require('express');
const { createBrand, updateBrand, deleteBrand, getaBrand, getAllBrands } = require('../controller/brandCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/', authMiddleware, createBrand, isAdmin);
router.put('/:id', authMiddleware, isAdmin, updateBrand);
router.delete('/:id', authMiddleware, isAdmin, deleteBrand);
router.get('/:id', getaBrand);
router.get('/', getAllBrands);

module.exports = router;