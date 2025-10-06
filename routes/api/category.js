const express=require("express")
const { createCategory } = require("../../controllers/category.controller")
const router=express.Router()

router.post("/create-category", createCategory)


module.exports=router