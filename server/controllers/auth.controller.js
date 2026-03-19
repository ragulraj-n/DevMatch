const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_PRIVATE_KEY} = require("../config/constant");
const { sendEmail } = require("../utils/emailService");
const asyncHandler = require("../utils/AsyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const registerUser = asyncHandler(async (req,res) => {
    const saltRounds = 10; 
    const {firstName, lastName, email, password} = req.body;
    
    const existingUser = await User.findOne({email});
    if(existingUser) 
        throw new ApiError(409,"EMAIL_ALREADY_EXISTS","Email already registered");   

    let userName = (firstName+lastName)
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");
    
    let existingUserName = await User.findOne({userName});
    while(existingUserName){
        userName = firstName + Math.floor(1000 + Math.random() * 9000);
        existingUserName = await User.findOne({userName});
    }

    const hashPassword = await bcrypt.hash(password,saltRounds);

        const user = await User.create({
        firstName,
        lastName,
        email,
        password:hashPassword,
        userName
    });

    const token = jwt.sign({userId:user._id},JWT_PRIVATE_KEY);

    res.cookie("token",token,{
        sameSite:"strict",
        httpOnly:true,
    });

    res.status(201).json(new ApiResponse(201,"User created successfully",user))
})

const loginUser = asyncHandler(async (req,res) =>{

        const {email, password} = req.body;
        
        const user = await User.findOne({email}).select("+password");
        if(!user) 
            throw new ApiError(401,"INVALID_CREDENTIALS","Invalid email or password");
        
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword) 
            throw new ApiError(401,"INVALID_CREDENTIALS","Invalid email or password");

        const token = jwt.sign({userId:user._id},JWT_PRIVATE_KEY);

        res.cookie("token",token,{
            httpOnly:true,
            sameSite: "lax",
            secure:false,
            path: "/",
        });

        user.password = undefined;
        res.status(200).json(new ApiResponse(200,"User Logged In successfully",user));
})

const logoutUser =  asyncHandler((req,res) =>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })

    res.status(200).json(new ApiResponse(200,"User Logged Out successfully"));

})

const forgotPassword = asyncHandler(async (req,res) =>{
        const {email} = req.body;
        if(!email) 
            throw new ApiError(400,"MISSING_REQUIRED_FIELD","email is required");

        const user = await User.findOne({email});
        if(!user) 
            return res.status(200).json(new ApiResponse(200,"If the email exists, reset link will be sent"));

        const token = jwt.sign({id: user._id },JWT_PRIVATE_KEY,{ expiresIn: "15m"});

        const resetLink = `http://localhost:5173/reset-password/${token}`;
        const htmpTemplate = (resetLink) =>{
            return `<!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>Reset Password</title>
            </head>

            <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px;">

            <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:6px; text-align:center;">

                <h2 style="color:#2563eb; margin-bottom:10px;">DevMatch</h2>

                <p>Hello,</p>

                <p>
                You requested to reset your password.
                Click the button below to set a new password.
                </p>

                <a 
                href="${resetLink}"
                style="display:inline-block; margin:20px 0; padding:12px 24px; background:#2563eb; color:white; text-decoration:none; border-radius:5px;">
                Reset Password
                </a>

                <p style="font-size:14px; color:#666;">
                If the button doesn't work, open this link:
                </p>

                <p style="font-size:14px; word-break:break-all;">
                ${resetLink}
                </p>

                <p style="font-size:13px; color:#888; margin-top:20px;">
                If you didn't request this, you can ignore this email.
                </p>
            </div>

            </body>
            </html>`
        }

         await sendEmail(email,"Reset Your DevMatch Password",`Reset Your DevMatch Password Click the Link: ${resetLink}`,htmpTemplate(resetLink));
        res.status(200).json(new ApiResponse(200,"If the email exists, reset link will be sent",token));
})

const validateResetPassword = asyncHandler(async (req,res) =>{
        const {token} = req.body;
        if(!token) 
            throw new ApiError(400,"MISSING_REQUIRED_FIELD","Reset token is required",);

        const decodedUser = jwt.verify(token,JWT_PRIVATE_KEY);
        
        const user = await User.findById(decodedUser.id);
        if(!user) 
            throw new ApiError(401,"TOKEN_INVALID","Invalid authentication token");

        res.status(200).json(new ApiResponse(200,"token is valid"));
})

const resetPassword = asyncHandler(async (req,res) =>{
    const saltRounds = 10;
    const {token,password} = req.body;
    const decodedUser = jwt.verify(token,JWT_PRIVATE_KEY);
    const user = await User.findById(decodedUser.id);
    if(!user) throw new ApiError(404,"USER_NOT_FOUND","user not found");

    const hashPassword = await bcrypt.hash(password,saltRounds);
    user.password = hashPassword;
    await user.save();

    res.status(200).json(new ApiResponse(200,"user password reset successfully"));
})

const changePassword = asyncHandler(async (req,res) =>{
        const saltRounds = 10;
        const userId = req.user._id;
        const {password,newPassword} = req.body;

        if(!userId) 
            throw new ApiError(400,"MISSING_REQUIRED_FIELD","userId not sent");

        
        const user = await User.findOne({_id:userId}).select("+password");
        if(!user) 
            throw new ApiError(404,"USER_NOT_FOUND","user not found");

        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword)
            throw new ApiError(401,"INVALID_CREDENTIALS","invalid password");
        

        const hashnewPassword = await bcrypt.hash(newPassword,saltRounds);
        user.password = hashnewPassword;
        await user.save();

        res.status(200).json(new ApiResponse(200,"password changed successfully"));
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    validateResetPassword,
    resetPassword,
    changePassword
}