const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { sendConnection } = require("../controllers/connection.controller");
const connectionRouter = express.Router();

connectionRouter.post("/connections/:status/:toUserId",authUser,sendConnection);

module.exports = connectionRouter;