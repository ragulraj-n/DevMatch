const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { sendConnection, handleConnection, getUserRequests, getUserSentRequests } = require("../controllers/connection.controller");
const { validatesendConnection } = require("../utils/validateConnectionRequest");
const connectionRouter = express.Router();

connectionRouter.post("/connections/:status/:toUserId",authUser,validatesendConnection,sendConnection);
connectionRouter.patch("/connections/:connectionId/:status",authUser,handleConnection);
connectionRouter.get("/connections/requests",authUser,getUserRequests);
connectionRouter.get("/connections/requests/sent",authUser,getUserSentRequests)

module.exports = connectionRouter;