const express=require("express")
const router=express.Router()
const userRouter=require("./user")
const categoryRouter=require("./category")
const subCategoryRouter=require("./subCategory")
const productRouter=require("./product")


router.use("/auth", userRouter)
router.use("/category", categoryRouter)
router.use("/sub-category", subCategoryRouter)
router.use("/product", productRouter)

module.exports=router