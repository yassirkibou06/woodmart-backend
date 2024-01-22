const Brand = require('../models/brandModel');
const asyncHandler = require('express-async-handler');
const ValidateMongodbId = require('../utils/validateMongodbId');

// Create new Brand
const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});

// update a Brand
const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    ValidateMongodbId(id);
    try {
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBrand);
    } catch (error) {
        throw new Error(error);
    }
});

// delete a Brand
const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    ValidateMongodbId(id);
    try {
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json(deleteBrand);
    } catch (error) {
        throw new Error(error);
    }
})

// get a Brand
const getaBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    ValidateMongodbId(id);
    try {
        const findaBrand = await Brand.findById(id);
        res.json(findaBrand);
    } catch (error) {
        throw new Error(error)
    }
});

// get all categories
const getAllBrands = asyncHandler(async (req, res) => {
    try {
        const getAllBrands = await Brand.find();
        res.json(getAllBrands);
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = { createBrand, updateBrand, deleteBrand, getaBrand, getAllBrands };