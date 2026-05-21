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
const cors = require('cors');
const { FRONTEND_URL } = require("./config/constant");
const AdditionalRouter = require("./routes/helper.routes");

const app = express();
app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE'],
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser());

const appRateLimiter = createRateLimiter({
    windowMs:60*1000,
    max:200,
});

app.use(appRateLimiter);
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/",connectionRouter);
app.use("/api/feed",feedRouter); 
app.use("/api/search",searchRouter);
app.use("/api",AdditionalRouter)
app.use(errorHandler);


connectDB().then(()=>{
    app.listen(5000,"0.0.0.0",()=> console.log("Server is running on http://localhost:5000")  )
}).catch(err => console.log("Error : "+ err));
