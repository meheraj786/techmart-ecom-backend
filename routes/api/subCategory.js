const express=require("express")
const { createSubCategory, getAllSubCategory, getSingleSubCategory, updateSingleSubCategory, deleteSingleSubCategory } = require("../../controllers/subCategory.controller")

const router=express.Router()

router.post("/create-subcategory", createSubCategory)
router.get("/all-subcategory", getAllSubCategory)
router.get("/single-subcategory/:id", getSingleSubCategory)
router.patch("/update-subcategory/:id", updateSingleSubCategory)
router.delete("/delete-subcategory/:id", deleteSingleSubCategory)

module.exports=router