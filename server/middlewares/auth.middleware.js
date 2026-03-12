const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config/constant");
const User = require("../models/User");
const asyncHandler = require("../utils/AsyncHandler");

const authUser = asyncHandler(async (req,res,next) =>{
    const { token } = req.cookies;
    if(!token) return res.status(400).json({
        message:"Login again",
    })
    const {userId} = jwt.verify(token,JWT_PRIVATE_KEY);
    const user = await User.findById(userId);
    if(!user) return res.status(401).json("User not exists");
    req.user = user;
    next();
})

const optionalAuthUser = asyncHandler(async(req,res,next) =>{
    const { token } = req.cookies;
    if(!token) return next();

    const {userId} = jwt.verify(token,JWT_PRIVATE_KEY);
    const user = await User.findById(userId);
    if(!user) return next();
    req.user = user;
    next();
    });

module.exports = {
    authUser,
    optionalAuthUser,
}