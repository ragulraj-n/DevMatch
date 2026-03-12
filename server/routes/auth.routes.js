const express = require("express");
const authRouter = express.Router();
const {registerUser, loginUser , logoutUser, forgotPassword, validateResetPassword, resetPassword, changePassword} = require("../controllers/auth.controller");
const { validateResult } = require("../middlewares/validateRequest.middleware");
const {loginUserValidate , registerUserValidate, forgotPasswordValidate, resetPasswordValidate, changePasswordValidate} = require("../middlewares/authValidate.middleware");
const {authUser} = require("../middlewares/auth.middleware");
const createRateLimiter = require("../utils/createRateLimiter");

const authRateLimiter = createRateLimiter({
    max:10,
})

const loginRateLimiter = createRateLimiter({
    windowMs:60*60*1000,
    max:20,
    message:"Too many login requests , try again later",
})

const forgotPasswordRateLimiter = createRateLimiter({
    windowMs:10*60*1000,
    max:10,
})

authRouter.use(authRateLimiter);
authRouter.post("/login",loginRateLimiter,loginUserValidate,validateResult,loginUser);
authRouter.post("/signup",registerUserValidate,validateResult,registerUser);
authRouter.post("/logout",logoutUser);
authRouter.post("/forgot-password",forgotPasswordRateLimiter,forgotPasswordValidate,validateResult,forgotPassword);
authRouter.post("/reset-password/validate",validateResetPassword);
authRouter.post("/reset-password",resetPasswordValidate,validateResult,resetPassword);
authRouter.post("/change-password",authUser,changePasswordValidate,validateResult,changePassword);

module.exports = authRouter;