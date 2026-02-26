const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_PRIVATE_KEY} = require("../config/constant")

const registerUser = async (req,res) => {
    const saltRounds = 10; 
    try{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({message : "Require all fields data"});
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password too short" });
    }
    
    const existingUser = await User.findOne({email});
    console.log(existingUser);
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

    res.status(200).json({
        message:"User created successfully",
        data: user,
    })
    }catch(err){
        res.status(400).json({message:`Error : ${err}`});
    }

}



module.exports = {
    registerUser,
}