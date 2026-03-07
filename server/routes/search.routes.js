const express = require("express");
const { searchUsers, searchUserSuggestion } = require("../controllers/search.controller");
const searchRouter = express.Router();
const {authUser} = require("../middlewares/auth.middleware");

searchRouter.get("/suggestion",authUser,searchUserSuggestion);
searchRouter.get("/",authUser,searchUsers);

module.exports = searchRouter;