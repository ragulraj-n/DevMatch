const express = require("express");
const userRouter = express.Router();
const {optionalAuthUser , authUser} = require("../middlewares/auth.middleware");
const {getUserProfile,editUserProfile, getLoggedUserProfile, addUserProject,updateUserProject} = require("../controllers/user.controller")
const {validateEditProfile, validateProject} = require("../middlewares/user.middleware");
const { validateResult } = require("../utils/validateRequest");
const { getUsersConnections } = require("../controllers/connection.controller");

userRouter.get("/myprofile",authUser,getLoggedUserProfile);
userRouter.patch("/:userName",authUser,validateEditProfile,validateResult,editUserProfile);
userRouter.post("/project",authUser,validateProject,validateResult,addUserProject);
userRouter.patch("/project/:projectId",authUser,validateProject,validateResult,updateUserProject);
userRouter.get("/:userName",optionalAuthUser,getUserProfile);
userRouter.get("/:userId/connections",authUser,getUsersConnections);

module.exports = userRouter;
