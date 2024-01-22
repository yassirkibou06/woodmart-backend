const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const cloudinaryUpload = require('../utils/cloudinary');
const validateMongodbId = require('../utils/validateMongodbId');
const fs = require('fs');
const User = require('../models/userModel');

// create a product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error)
    }
})

// update a product
const updateaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateaProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateaProduct);
    } catch (error) {
        throw new Error(error)
    }
})

// delete a product
const deleteaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const deleteaProduct = await Product.findByIdAndDelete(id);
        res.json(deleteaProduct);
    } catch (error) {
        throw new Error(error)
    }
})

// get a product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findaProduct = await Product.findById(id);
        res.json(findaProduct);
    } catch (error) {
        throw new Error(error)
    }
})

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
    try {
        // filtering
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((field) => delete queryObj[field]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        // sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const numProducts = await Product.countDocuments();
            if (skip >= numProducts) throw new Error('This page does not exist');
        }
        console.log(page, limit, skip);

        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
        if (alreadyAdded) {
            const user = await User.findByIdAndUpdate(_id, {
                $pull: { wishlist: prodId }
            }, {
                new: true
            });
            res.json(user);
        } else {
            const user = await User.findByIdAndUpdate(_id, {
                $push: { wishlist: prodId }
            }, {
                new: true
            });
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
})

//rating
const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find((userId) => userId.postedby.toString() === _id.toString());
        if (alreadyRated) {
            const updateRating = await Product.updateOne({
                ratings: { $elemMatch: alreadyRated }
            }, {
                $set: { "ratings.$.star": star, "ratings.$.comment": comment }
            }, {
                new: true
            })
        } else {
            const rateProduct = await Product.findByIdAndUpdate(prodId, {
                $push: { ratings: { star, comment, postedby: _id } }
            }, {
                new: true
            })
        }
        const getallRatings = await Product.findById(prodId);
        const totalRating = getallRatings.ratings.length;
        const ratingSum = getallRatings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
        const actualRating = Math.round(ratingSum / totalRating);
        const finalProduct = await Product.findByIdAndUpdate(prodId, {
            totalrating: actualRating
        },
            {
                new: true
            }
        );
        res.json(finalProduct);
    } catch (error) {
        throw new Error(error);
    }
})

const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const uploader = (path) => cloudinaryUpload(path, 'images');
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            console.log(newPath);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        const findProduct = await Product.findByIdAndUpdate(id, {
            images: urls.map((file) => {
                return file;
            })
        })
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    createProduct,
    getaProduct,
    getAllProducts,
    updateaProduct,
    deleteaProduct,
    addToWishlist,
    rating,
    uploadImages
}