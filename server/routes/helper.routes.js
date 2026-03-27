const express = require("express");
const upload = require("../middlewares/multer.middlewares");
const uploadImage = require("../controllers/helper.controller");
const Router = express.Router()

Router.post("/upload/image",upload.single("image"),uploadImage);

module.exports = Router;