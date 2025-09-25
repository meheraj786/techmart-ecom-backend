const express=require("express")
const { createUser } = require("../../controllers/user.controllers")
const { verifyController } = require("../../controllers/verifyController")
const router=express.Router()

router.post("/createuser", createUser)
router.post("/verify-email", verifyController)


module.exports=router