const express = require("express");
const userRouter = express.Router();
const {optionalAuthUser , authUser} = require("../middlewares/auth.middleware");
const {getUserProfile,editUserProfile, getLoggedUserProfile, addUserProject} = require("../controllers/user.controller")
const {validateEditProfile, validateProject} = require("../middlewares/user.middleware");
const { validateResult } = require("../utils/validateRequest");
const { getUsersConnections } = require("../controllers/connection.controller");
const { validationResult } = require("express-validator");

userRouter.get("/myprofile",authUser,getLoggedUserProfile);
userRouter.patch("/:userName",authUser,validateEditProfile,validateResult,editUserProfile);
userRouter.post("/:userName/project",authUser,validateProject,validateResult,addUserProject);
userRouter.get("/:userName",optionalAuthUser,getUserProfile);
userRouter.get("/:userId/connections",authUser,getUsersConnections);

module.exports = userRouter;
