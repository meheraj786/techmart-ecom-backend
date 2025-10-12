const express = require("express");
const { createProduct, allProducts } = require("../../controllers/product.controller");
const { verify } = require("jsonwebtoken");
const { upload } = require("../../middleware/multer.middleware");

const router = express.Router();

router.post("/create-product", verify, upload.single("image"), createProduct);
router.get("/all-product", allProducts)
// router.get("/single-subcategory/:id", getSingleSubCategory)
// router.patch("/update-subcategory/:id", updateSingleSubCategory)
// router.delete("/delete-subcategory/:id", deleteSingleSubCategory)

module.exports = router;
