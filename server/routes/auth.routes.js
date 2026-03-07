const express = require("express");
const authRouter = express.Router();
const {registerUser, loginUser , logoutUser, forgotPassword, validateResetPassword, resetPassword, changePassword} = require("../controllers/auth.controller");
const {validateResult} = require("../utils/validateRequest");
const {loginUserValidate , registerUserValidate, forgotPasswordValidate, resetPasswordValidate, changePasswordValidate} = require("../middlewares/authValidate.middleware");
const {authUser} = require("../middlewares/auth.middleware");

authRouter.post("/login",loginUserValidate,validateResult,loginUser);
authRouter.post("/signup",registerUserValidate,validateResult,registerUser);
authRouter.post("/logout",logoutUser);
authRouter.post("/forgot-password",forgotPasswordValidate,validateResult,forgotPassword);
authRouter.post("/reset-password/validate",validateResetPassword);
authRouter.post("/reset-password",resetPasswordValidate,validateResult,resetPassword);
authRouter.post("/change-password",authUser,changePasswordValidate,validateResult,changePassword);

module.exports = authRouter;