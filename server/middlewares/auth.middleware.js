const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config/constant");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const authUser = asyncHandler(async (req,res,next) =>{
    const { token } = req.cookies;
    if(!token) 
        throw new ApiError(401,"UNAUTHORIZED","Login again");
    const {userId} = jwt.verify(token,JWT_PRIVATE_KEY);
    const user = await User.findById(userId);
    if(!user) 
        throw new ApiError(404,"USER_NOT_FOUND","User not found");
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