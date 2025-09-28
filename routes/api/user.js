const express=require("express")
const { createUser } = require("../../controllers/user.controllers")
const { verifyController } = require("../../controllers/verifyController")
const { resendOtp } = require("../../controllers/resendOtp.controller")
const router=express.Router()

router.post("/createuser", createUser)
router.post("/verify-email", verifyController)
router.post("/resend-otp", resendOtp)


module.exports=router