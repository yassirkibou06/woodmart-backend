const fs = require("fs");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require('../utils/validateMongodbId');

const {
    cloudinaryUploadImg,
    cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);

            // Check if the file exists before attempting to delete
            if (fs.existsSync(path)) {
                // Use fs.unlink instead of fs.unlinkSync
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${path}:`, err);
                    } else {
                        console.log(`File ${path} deleted successfully`);
                    }
                });
            } else {
                console.log(`File ${path} does not exist`);
            }
        }

        const images = urls.map((file) => {
            return file;
        });
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/*
const uploadImages = asyncHandler(async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            console.log(newpath);

            // Push only the 'url' property into the urls array
            urls.push(newpath.url);

            // Check if the file exists before attempting to delete
            if (fs.existsSync(path)) {
                // Use fs.unlink instead of fs.unlinkSync
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${path}:`, err);
                    } else {
                        console.log(`File ${path} deleted successfully`);
                    }
                });
            } else {
                console.log(`File ${path} does not exist`);
            }
        }

        // Return the array of image URLs
        res.json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});*/



const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = cloudinaryDeleteImg(id, "images");
        res.json({ message: "Deleted" });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    uploadImages,
    deleteImages,
};