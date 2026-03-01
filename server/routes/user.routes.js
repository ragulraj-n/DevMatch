const express = require("express");
const userRouter = express.Router();
const {optionalAuthUser , authUser} = require("../middlewares/auth.middleware");
const {getUserProfile,editUserProfile, getLoggedUserProfile} = require("../controllers/user.controller")
const {validateEditProfile} = require("../middlewares/user.middleware");
const { validateResult } = require("../utils/validateRequest");

userRouter.get("/myprofile",authUser,getLoggedUserProfile);
userRouter.get("/:userName",optionalAuthUser,getUserProfile);
userRouter.patch("/:userName",authUser,validateEditProfile,validateResult,editUserProfile);
module.exports = userRouter;