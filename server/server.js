const express = require("express");
const connectDB = require("./config/database");
const app =express();



connectDB().then(()=>{
    app.listen(5000,()=> console.log("Server is running on http://localhost:5000"))
}).catch(err => console.log("Error : "+ err));
