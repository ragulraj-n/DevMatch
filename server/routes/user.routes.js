const express = require("express");
const userRouter = express.Router();
const {optionalAuthUser , authUser} = require("../middlewares/auth.middleware");
const {getUserProfile,editUserProfile, getLoggedUserProfile} = require("../controllers/user.controller")
const {validateEditProfile} = require("../middlewares/user.middleware");
const { validateResult } = require("../utils/validateRequest");
const { getUsersConnections } = require("../controllers/connection.controller");

userRouter.get("/myprofile",authUser,getLoggedUserProfile);
userRouter.patch("/:userName",authUser,validateEditProfile,validateResult,editUserProfile);
userRouter.get("/:userName",optionalAuthUser,getUserProfile);
userRouter.get("/:userId/connections",authUser,getUsersConnections);

module.exports = userRouter;
