const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/devMatch");
    console.log("Connected to Database Successfully!")
}

module.exports = connectDB;