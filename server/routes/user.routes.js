const express = require("express");
const userRouter = express.Router();
const {optionalAuthUser , authUser} = require("../middlewares/auth.middlewares");
const {getUserProfile,editUserProfile} = require("../controllers/user.controller")
const {validateEditProfile} = require("../middlewares/user.middleware")

userRouter.get("/:userName",optionalAuthUser,getUserProfile);
userRouter.patch("/:userName",authUser,validateEditProfile,editUserProfile);
module.exports = userRouter;