const express = require("express");
const { createProduct, allProducts, getSingleProduct, editProduct, deleteProduct, imageLive } = require("../../controllers/product.controller");
const { verify } = require("jsonwebtoken");
const { upload } = require("../../middleware/multer.middleware");

const router = express.Router();

router.post("/create-product", verify, upload.single("image"), createProduct);
router.get("/all-product", allProducts)
router.get("/single-product/:id", getSingleProduct)
router.patch("/update-product/:id", upload.single("image"), editProduct)
router.post("/image", upload.single("image"), imageLive)
router.delete("/delete-product/:id", deleteProduct)

module.exports = router;
