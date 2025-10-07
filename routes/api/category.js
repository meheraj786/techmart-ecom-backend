const express=require("express")
const { createCategory, getAllCategory, getSingleCategory, updateSingleCategory } = require("../../controllers/category.controller")
const router=express.Router()

router.post("/create-category", createCategory)
router.get("/all-category", getAllCategory)
router.get("/single-category/:id", getSingleCategory)
router.patch("/update-category/:id", updateSingleCategory)
router.delete("/delete-category/:id", createCategory)


module.exports=router