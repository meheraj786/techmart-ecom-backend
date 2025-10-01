const express=require("express")
const { createUser } = require("../../controllers/user.controllers")
const { verifyController } = require("../../controllers/verifyController")
const { resendOtp } = require("../../controllers/resendOtp.controller")
const { loginUser } = require("../../controllers/loginUser.controller")
const { tokenVerify } = require("../../middleware/tokenVerify")
const { products } = require("../../controllers/products.controller")
const router=express.Router()

router.post("/createuser", createUser)
router.post("/verify-email", verifyController)
router.post("/resend-otp", resendOtp)
router.post("/login", loginUser)
router.post("/products", tokenVerify, products)


module.exports=router