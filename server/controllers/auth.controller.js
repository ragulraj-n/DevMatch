const User = require("../models/User")

const registerUser = async (req,res) => {
    try{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({message : "Require all fields data"});
    }
    // unique user
    const existingUser = User.findOne({email});
    if(existingUser) return res.status(400).json({message: "User already exists"});

    let userName = firstName+lastName;
    const existingUserName = User.findOne({userName});
    if(existingUserName){
        userName = firstName + (1000 + Math.random() * 9000);
    }

    // bcrypt password
    // jwt token

        const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        userName
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