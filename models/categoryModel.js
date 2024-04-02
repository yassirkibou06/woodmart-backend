const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    link: {
        type: String,
        required: true
    }
});

const productGroupSchema = new mongoose.Schema({
    groupTitle: {
        type: String,
        required: true
    },
    products: [productSchema]
});

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    link: {
        type: String,
        required: true
    },
    productGroups: [productGroupSchema]
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
