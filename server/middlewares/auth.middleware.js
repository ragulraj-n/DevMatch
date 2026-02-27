const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config/constant");
const User = require("../models/User");

const authUser = async (req,res,next) =>{
    try{
    const { token } = req.cookies;
    if(!token) return res.status(400).json({
        message:"Login again",
    })
    const {userId} = jwt.verify(token,JWT_PRIVATE_KEY);
    const user = await User.findById(userId);
    if(!user) return res.status(401).json("User not exists");
    req.user = user;
    next();
    }catch(err){
        res.status(401).json({
            message:err.message,
        })
    }
}

const optionalAuthUser = async(req,res,next) =>{
    try{
    const { token } = req.cookies;
    if(!token) return next();

    const {userId} = jwt.verify(token,JWT_PRIVATE_KEY);
    const user = await User.findById(userId);
    if(!user) return next();
    req.user = user;
    next();
    }catch(err){
        next();
    }
}

module.exports = {
    authUser,
    optionalAuthUser,
}