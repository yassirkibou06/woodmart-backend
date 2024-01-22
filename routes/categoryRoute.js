const express = require('express');
const { createCategory, updateCategory, deleteCategory, getaCategory, getAllCategories } = require('../controller/categoryCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/', authMiddleware, createCategory, isAdmin);
router.put('/:id', authMiddleware, isAdmin, updateCategory);
router.delete('/:id', authMiddleware, isAdmin, deleteCategory);
router.get('/:id', getaCategory);
router.get('/', getAllCategories);

module.exports = router;