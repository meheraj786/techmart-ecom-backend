const express=require("express")
const router=express.Router()
const userRouter=require("./user")
const categoryRouter=require("./category")
const subCategoryRouter=require("./subCategory")


router.use("/auth", userRouter)
router.use("/category", categoryRouter)
router.use("/sub-category", subCategoryRouter)

module.exports=router