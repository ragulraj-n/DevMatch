const express = require("express");
const authRouter = express.Router();
const {registerUser, loginUser , logoutUser, forgotPassword, validateResetPassword} = require("../controllers/auth.controller");
const {validateResult} = require("../utils/validateRequest");
const {loginUserValidate , registerUserValidate, forgotPasswordValidate} = require("../middlewares/authValidate.middleware")

authRouter.post("/login",loginUserValidate,validateResult,loginUser);
authRouter.post("/signup",registerUserValidate,validateResult,registerUser);
authRouter.post("/logout",logoutUser);
authRouter.post("/forgot-password",forgotPasswordValidate,validateResult,forgotPassword);
authRouter.post("/reset-password/validate",validateResetPassword);

module.exports = authRouter;