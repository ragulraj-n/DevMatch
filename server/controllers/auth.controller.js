const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_PRIVATE_KEY} = require("../config/constant");
const { sendEmail } = require("../utils/emailService");

const registerUser = async (req,res) => {
    const saltRounds = 10; 
    try{
    const {firstName, lastName, email, password} = req.body;
    
    const existingUser = await User.findOne({email});
    if(existingUser) return res.status(400).json({message: "User already exists"});

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

    res.status(201).json({
        message:"User created successfully",
    })
    }catch(err){
        res.status(400).json({message: err.message});
    }

}

const loginUser = async (req,res) =>{
   try{
        const {email, password} = req.body;
        
        const user = await User.findOne({email}).select("+password");
        if(!user) return res.status(400).json({
            message:"Invalid login credentials",
        })
        
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword) return res.status(400).json({
            message:"Invalid login credentials",
        })

        const token = jwt.sign({userId:user._id},JWT_PRIVATE_KEY);

        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
        });

        res.status(200).json({
            message:"User logged In successfully"
        })
   }catch(err){
        res.status(400).json({
            message: err.message,
        })
   }
}

const logoutUser = (req,res) =>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })

    res.status(200).json({
        message:"User Logged Out successfully",
    })
}

const forgotPassword = async (req,res) =>{
    try{
        const {email} = req.body;
        if(!email) return res.status(400).json({message:"Enter the Email Id"});

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"User does not exists"});

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
        res.status(200).json({message:"password reset token sent in email",
            token,
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const validateResetPassword = async (req,res) =>{
    try{
        const {token} = req.body;
        if(!token) return res.status(400).json({valid: false,
            message:"token required"});
        const decodedUser = jwt.verify(token,JWT_PRIVATE_KEY);

        const user = await User.findOne({_id:decodedUser.id});
        if(!user) return res.status(401).json({valid: false,
            message:"invalid token"});

        res.status(200).json({valid:true, message:"token is valid"});
    }catch(err){
        res.status(500).json({valid: false,
            message:err.message});
    }
}

const resetPassword = async (req,res) =>{
try{
    const saltRounds = 10;
    const {token,password} = req.body;
    const decodedUser = jwt.verify(token,JWT_PRIVATE_KEY);
    const user = await User.findOne({_id:decodedUser.id});
    if(!user) return res.status(404).json({message:"user doesn't exists"});

    const hashPassword = await bcrypt.hash(password,saltRounds);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({message:"user password reset successfully"});
}catch(err){
    res.status(500).json({message:err.message});
}
}

const changePassword = async (req,res) =>{
    try{
        const saltRounds = 10;
        const userId = req.user._id;
        const {password,newPassword} = req.body;

        if(!userId) return res.status(404).json({message:"userId not found"});
        
        const user = await User.findOne({_id:userId}).select("+password");
        if(!user) return res.status(404).json({message:"user doesn't exist"});

        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword) return res.status(403).json({message:"Invalid password"});

        const hashnewPassword = await bcrypt.hash(newPassword,saltRounds);
        user.password = hashnewPassword;
        await user.save();

        res.status(200).json({message:"user's password changed successfully"});

    }catch(err){
        res.status(400).json({message:err.message});
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    validateResetPassword,
    resetPassword,
    changePassword
}