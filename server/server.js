const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const connectionRouter = require("./routes/connection.routes");
const feedRouter = require("./routes/feed.routes");
const searchRouter = require("./routes/search.routes");
const createRateLimiter = require("./utils/createRateLimiter");
const errorHandler = require("./middlewares/errorHandler")

const app = express();
app.use(express.json());
app.use(cookieParser());

const appRateLimiter = createRateLimiter({
    windowMs:60*1000,
    max:200,
});

app.use(appRateLimiter);
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/",connectionRouter);
app.use("/feed",feedRouter); 
app.use("/search",searchRouter);

app.use("/",errorHandler);


connectDB().then(()=>{
    app.listen(5000,()=> console.log("Server is running on http://localhost:5000"))
}).catch(err => console.log("Error : "+ err));
