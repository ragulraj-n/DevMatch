const User = require("../models/User");
const mongoose = require("mongoose");
const asyncHandler = require("../utils/AsyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const getLoggedUserProfile = asyncHandler(async (req,res) =>{
        const user = req.user;
        res.status(200).json(new ApiResponse(200,"User profile fetched successfully",user)); 
})

const getUserProfile = asyncHandler(async (req,res) =>{
        const userNameParams = req.params.userName;
        const user = await User.findOne({ userName: userNameParams });

        if (!user) 
          throw new ApiError(404,"USER_NOT_FOUND","user not found");

        const isOwner = req.user && req.user.userName === userNameParams;

        const responseData = {
            _id:user._id,
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
            portfolio: user.portfolio,
            projects:user.projects,
        };

        if(isOwner) {
            responseData.email = user.email;
        }

        res.status(200).json(new ApiResponse(200,"profile fetched successfully",responseData));
})

const editUserProfile = asyncHandler(async (req,res) =>{
        const userNameParams = req.params.userName;
        const loggedInUser = req.user;
        const {profileImage,...otherKeys} = req.body;
        if(!loggedInUser || userNameParams !== loggedInUser.userName) 
              throw new ApiError(403,"FORBIDDEN","can't edit another user profile");

        if(req.body.userName){
            const existingUser  = await User.findOne({userName:req.body.userName});
            if(existingUser && !existingUser._id.equals(loggedInUser._id))
                throw new ApiError(409,"USERNAME_TAKEN","Username is already taken");
        }    
        
        if(profileImage){
          loggedInUser.profileImage.imageUrl = profileImage;
        }
        
        Object.keys(otherKeys).forEach(key => loggedInUser[key] = otherKeys[key]);
        
        const user = await loggedInUser.save();

        res.status(200).json(new ApiResponse(200,"profile updated successfully",user));
})

const addUserProject = asyncHandler(async (req,res) =>{
    const user = req.user;
    const {title,description,techStack,githubLink,liveLink,image} = req.body;
    if(!title) 
      throw new ApiError(400,"MISSING_REQUIRED_FIELD","title is required");

    user.projects.push({
                    title,
                    description,
                    techStack,
                    githubLink,
                    liveLink,
                    image
            });

    const updatedUser = await user.save();

    res.status(201).json(new ApiResponse(201,"Project added successfully",updatedUser));
})

const updateUserProject = asyncHandler(async (req,res) =>{
    const userId = req.user._id;
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(400,"INVALID_REQUEST","invalid projectId");
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

    if (Object.keys(updateFields).length === 0) 
      throw new ApiError(400,"DUPLICATE_RESOURCE","no field to update");

    const result = await User.updateOne(
      { _id: userId, "projects._id": projectId },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) 
      throw new ApiError(404,"PROJECT_NOT_FOUND","project not found");

    res.status(200).json(new ApiResponse(200,"project updated successfully",result));
})

module.exports = {
    getUserProfile,
    editUserProfile,
    getLoggedUserProfile,
    addUserProject,
    updateUserProject
}