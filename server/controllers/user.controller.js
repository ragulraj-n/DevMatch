const User = require("../models/User");

const getLoggedUserProfile = async (req,res) =>{
    try{
        const user = req.user;
        res.status(200).json({message:"user profile fetched successfully",
            user,
        });
    }catch(err){
        res.status(400).json({message:err.message});
    }
} 

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
        const loggedInUser = req.user;

        if(!loggedInUser || userNameParams !== loggedInUser.userName) 
            return res.status(403).json({
                message:"Unauthorized access",
        })

        if(req.body.userName){
            const existingUser  = await User.findOne({userName:req.body.userName});
            if(existingUser && !existingUser._id.equals(loggedInUser._id)){
               return res.status(400).json({
                    message:"userName already exists , try another userName",
                })
                }
            }

        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();

        res.status(200).json({
            message:"user profile updated successfully",
        })

}catch(err){
        res.status(500).json({
            message:err.message,
        })
    }
}

const addUserProject = async (req,res) =>{
   try{
     const userNameParams = req.params.userName;
     const loggedInUser = req.user;

    if(!loggedInUser || userNameParams !== loggedInUser.userName)
            return res.status(403).json({
                message:"Unauthorized access",
    })

    const user = req.user;
    const {title,description,techStack,githubLink,liveLink,image} = req.body;

    user.projects.push({
                    title,
                    description,
                    techStack,
                    githubLink,
                    liveLink,
                    image
            });

    await user.save();

    res.status(201).json({message:"Project updated successfully"});
}catch(err){
    res.status(500).json({message:err.message});
}
}

module.exports = {
    getUserProfile,
    editUserProfile,
    getLoggedUserProfile,
    addUserProject
}