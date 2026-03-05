const express = require("express");
const {sendFeed} = require("../controllers/feed.controller");
const {authUser} = require("../middlewares/auth.middleware")
const feedRouter = express.Router();

feedRouter.get("/",authUser,sendFeed);

module.exports = feedRouter;