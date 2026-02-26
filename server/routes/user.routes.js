const express = require("express");
const userRouter = express.Router();
const {authUser} = require("../middlewares/auth.middlewares");
const {getUserProfile} = require("../controllers/user.controller")

userRouter.get("/:userName",authUser,getUserProfile)

module.exports = userRouter;