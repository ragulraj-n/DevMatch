const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/authRouter")

const app = express();
app.use(express.json());

app.use("/",authRouter);


connectDB().then(()=>{
    app.listen(5000,()=> console.log("Server is running on http://localhost:5000"))
}).catch(err => console.log("Error : "+ err));
