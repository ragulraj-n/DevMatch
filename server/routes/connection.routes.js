const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const { sendConnection, handleConnection, getConnections,getUserRequests, getUserSentRequests, deleteConnection } = require("../controllers/connection.controller");
const { validatesendConnection } = require("../middlewares/validateConnectionRequest.middleware");
const createRateLimiter = require("../utils/createRateLimiter");
const connectionRouter = express.Router();

const sendConnectionRateLimiter = createRateLimiter({
    max:60,
});

const sendConenctionRateLimiter = createRateLimiter({
    max:20,
});

connectionRouter.use(sendConnectionRateLimiter);
connectionRouter.post("/connections/:status/:toUserId",authUser,sendConenctionRateLimiter,validatesendConnection,sendConnection);
connectionRouter.patch("/connections/:connectionId/:status",authUser,handleConnection);
connectionRouter.get("/connections/requests",authUser,getUserRequests);
connectionRouter.get("/connections/requests/sent",authUser,getUserSentRequests);
connectionRouter.get("/connections/",authUser,getConnections);
connectionRouter.delete("/connections/:connectionId",authUser,deleteConnection);

module.exports = connectionRouter;