const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_PRIVATE_KEY} = require("../config/constant")

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

        const token = jwt.sign({_id: user._id },JWT_PRIVATE_KEY,{ expiresIn: "15m"});

        res.status(200).json({message:"password reset token sent in email",
            token,
        });
    }catch(err){
        res.status(500).json({message:"internal server error"});
    }
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    validateResetPassword
}