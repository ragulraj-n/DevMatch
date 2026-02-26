const express = require("express");
const authRouter = express.Router();
const {registerUser, loginUser} = require("../controllers/auth.controller");

authRouter.post("/login",loginUser);
authRouter.post("/signup",registerUser);

module.exports = authRouter;