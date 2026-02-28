const express = require("express");
const authRouter = express.Router();
const {registerUser, loginUser , logoutUser} = require("../controllers/auth.controller");
const {validateResult} = require("../utils/validateRequest");
const {loginUserValidate , registerUserValidate} = require("../middlewares/authValidate.middleware")

authRouter.post("/login",loginUserValidate,validateResult,loginUser);
authRouter.post("/signup",registerUserValidate,validateResult,registerUser);
authRouter.post("/logout",logoutUser);

module.exports = authRouter;