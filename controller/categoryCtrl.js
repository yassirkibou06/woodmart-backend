const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const ValidateMongodbId = require('../utils/validateMongodbId');

// Create new category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// update a category
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    ValidateMongodbId(id);
    try {
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// delete a category
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    ValidateMongodbId(id);
    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
})

// get a category
const getaCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    ValidateMongodbId(id);
    try {
        const findaCategory = await Category.findById(id);
        res.json(findaCategory);
    } catch (error) {
        throw new Error(error)
    }
});

// get all categories
const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const getAllCategories = await Category.find();
        res.json(getAllCategories);
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = { createCategory, updateCategory, deleteCategory, getaCategory, getAllCategories };