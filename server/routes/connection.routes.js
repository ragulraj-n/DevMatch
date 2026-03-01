const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { sendConnection } = require("../controllers/connection.controller");
const { validatesendConnection } = require("../utils/validateConnectionRequest");
const connectionRouter = express.Router();

connectionRouter.post("/connections/:status/:toUserId",authUser,validatesendConnection,sendConnection);

module.exports = connectionRouter;