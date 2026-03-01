const User = require("../models/User")

const getUserProfile = async (req,res) =>{
    try{
        const userNameParams = req.params.userName;

        const user = await User.findOne({ userName: userNameParams });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isOwner = req.user && req.user.userName === userNameParams;

        const responseData = {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            bio: user.bio,
            profileImage: user.profileImage,
            location: user.location,
            experienceLevel: user.experienceLevel,
            availabilityStatus: user.availabilityStatus,
            skills: user.skills,
            interests: user.interests,
            github: user.github,
            linkedin: user.linkedin,
            portfolio: user.portfolio
        };

        if(isOwner) {
            responseData.email = user.email;
        }

        res.status(200).json({
            message: "User data received successfully",
            data: responseData
        });
    }catch(err){
        res.status(400).json({
            message:err.message,
        })
    }
}

const editUserProfile = async (req,res) =>{
    try{
        const userNameParams = req.params.userName;
        const loggedInuser = req.user;

        if(!loggedInuser || userNameParams !== loggedInuser.userName) 
            return res.status(403).json({
                message:"Unauthorized access",
        })

        if(req.body.userName){
            const existingUser  = await User.findOne({userName:req.body.userName});
            if(existingUser && !existingUser._id.equals(loggedInuser._id)){
               return res.status(400).json({
                    message:"userName already exists , try another userName",
                })
                }
            }

        Object.keys(req.body).forEach(key => loggedInuser[key] = req.body[key]);
        await loggedInuser.save();

        res.status(200).json({
            message:"user profile updated successfully",
        })

}catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

module.exports = {
    getUserProfile,
    editUserProfile
}