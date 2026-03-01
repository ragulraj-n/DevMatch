const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const connectionRouter = require("./routes/connection.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",connectionRouter);
app.use("/",userRouter);



connectDB().then(()=>{
    app.listen(5000,()=> console.log("Server is running on http://localhost:5000"))
}).catch(err => console.log("Error : "+ err));
