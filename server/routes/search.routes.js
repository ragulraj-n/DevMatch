const express = require("express");
const { searchUsers, searchUserSuggestion } = require("../controllers/search.controller");
const searchRouter = express.Router();
const {authUser} = require("../middlewares/auth.middleware");
const createRateLimiter = require("../utils/createRateLimiter");

const searchRateLimiter = createRateLimiter({
    max:30,
})

searchRouter.get("/suggestion",authUser,searchUserSuggestion);
searchRouter.get("/",authUser,searchRateLimiter,searchUsers);

module.exports = searchRouter;