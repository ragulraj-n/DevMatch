const express = require("express");
const upload = require("../middlewares/multer.middlewares");
const uploadImage = require("../controllers/helper.controller");
const { authUser } = require("../middlewares/auth.middleware");
const Router = express.Router()

Router.post("/upload/image",authUser,upload.single("image"),uploadImage);

module.exports = Router;