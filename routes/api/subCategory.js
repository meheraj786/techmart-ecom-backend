const express=require("express")
const { createSubCategory } = require("../../controllers/subCategory.controller")

const router=express.Router()

router.post("/create-subcategory", createSubCategory)


module.exports=router