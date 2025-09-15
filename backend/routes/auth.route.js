import express from "express"
import { login, logOut, sighUp ,verifyOtp} from "../controllers/auth.controller.js"

import { signupValidation,loginValidation } from "../middleware/validation.js"
import { validateResult } from "../middleware/validateResult.js"

const authRouter = express.Router()

authRouter.post("/signup",signupValidation,validateResult,sighUp)
authRouter.post("/login",loginValidation,validateResult,login)
authRouter.post("/logout",logOut)

authRouter.post("/verify-otp", verifyOtp);  

export default authRouter