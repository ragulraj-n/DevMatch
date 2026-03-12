const express = require("express");
const userRouter = express.Router();
const {optionalAuthUser , authUser} = require("../middlewares/auth.middleware");
const {getUserProfile,editUserProfile, getLoggedUserProfile, addUserProject,updateUserProject} = require("../controllers/user.controller")
const {validateEditProfile, validateProject} = require("../middlewares/user.middleware");
const { validateResult } = require("../middlewares/validateRequest.middleware");
const { getUsersConnections } = require("../controllers/connection.controller");
const createRateLimiter = require("../utils/createRateLimiter");

const userRouterRateLimter = createRateLimiter({
    max:60,
})

const editProfileRateLimiter = createRateLimiter({
    max:10,
    message:"Too many edit profile requests , try again after 1 minute",
})

userRouter.use(userRouterRateLimter);
userRouter.get("/myprofile",authUser,getLoggedUserProfile);
userRouter.patch("/:userName",authUser,editProfileRateLimiter,validateEditProfile,validateResult,editUserProfile);
userRouter.post("/project",authUser,validateProject,validateResult,addUserProject);
userRouter.patch("/project/:projectId",authUser,editProfileRateLimiter,validateProject,validateResult,updateUserProject);
userRouter.get("/:userName",optionalAuthUser,getUserProfile);
userRouter.get("/:userId/connections",authUser,getUsersConnections);

module.exports = userRouter;
