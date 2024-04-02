const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhotos, productImageResize } = require('../middlewares/uploadimages');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, uploadPhotos.array('images', 10), productImageResize, uploadImages);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;