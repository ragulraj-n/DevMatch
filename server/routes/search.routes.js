const express = require("express");
const { searchUsers, searchUserSuggestion } = require("../controllers/search.controller");
const searchRouter = express.Router();
const {authUser} = require("../middlewares/auth.middleware");
const createRateLimiter = require("../utils/createRateLimiter");
const searchCache = require("../middlewares/searchCache.js");

const searchRateLimiter = createRateLimiter({
    max:30,
})

searchRouter.get("/suggestion",authUser,searchCache("suggestion"),searchUserSuggestion);
searchRouter.get("/",authUser,searchRateLimiter,searchCache("search"),searchUsers);

module.exports = searchRouter;