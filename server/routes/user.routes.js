const express = require("express");
const userRouter = express.Router();
const {optionalAuthUser} = require("../middlewares/auth.middlewares");
const {getUserProfile} = require("../controllers/user.controller")

userRouter.get("/:userName",optionalAuthUser,getUserProfile);

module.exports = userRouter;