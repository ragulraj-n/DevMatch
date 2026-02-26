const express = require("express");
const authRouter = express.Router();
const {registerUser} = require("../controllers/auth.controller")
authRouter.post("/",registerUser);

module.exports = authRouter;