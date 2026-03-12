const User = require("../models/User");
const mongoose = require("mongoose");
const asyncHandler = require("../utils/AsyncHandler");

const getLoggedUserProfile = asyncHandler(async (req,res) =>{
        const user = req.user;
        res.status(200).json({message:"user profile fetched successfully",
            user,
        }); 
})

const getUserProfile = asyncHandler(async (req,res) =>{
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
})

const editUserProfile = asyncHandler(async (req,res) =>{
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
})

const addUserProject = asyncHandler(async (req,res) =>{
    const user = req.user;
    const {title,description,techStack,githubLink,liveLink,image} = req.body;
    if(!title) return res.status(400).json({message:"Title not found in request"});

    user.projects.push({
                    title,
                    description,
                    techStack,
                    githubLink,
                    liveLink,
                    image
            });

    await user.save();

    res.status(201).json({message:"Project added successfully"});
})

const updateUserProject = asyncHandler(async (req,res) =>{
    const userId = req.user._id;
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const allowedFields = [
      "title",
      "description",
      "techStack",
      "githubLink",
      "liveLink",
      "image"
    ];

    const updateFields = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateFields[`projects.$.${field}`] = req.body[field];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const result = await User.updateOne(
      { _id: userId, "projects._id": projectId },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project updated successfully"
    });
})

module.exports = {
    getUserProfile,
    editUserProfile,
    getLoggedUserProfile,
    addUserProject,
    updateUserProject
}