const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { redisClient } = require("../config/redis");

const searchUsers = asyncHandler(async (req, res) => {
    const q = req.query.q?.trim();
    if (!q || q.length < 2) {
        throw new ApiError(400,"VALIDATION_ERROR","query must contain at least 2 characters");
    }

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(20, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page-1)*limit;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const words = escaped.split(/\s+/);
    const firstWord = words[0];
    const secondWord = words[1] || "";

    const users = await User.aggregate([
      {
        $match: {
          $or: [
            { userName: { $regex: `^${escaped}`, $options: "i" } },
            { firstName: { $regex: `^${escaped}`, $options: "i" } },
            ...(words.length >= 2
              ? [
                  {
                    $and: [
                      { firstName: { $regex: `^${firstWord}`, $options: "i" } },
                      { lastName: { $regex: `^${secondWord}`, $options: "i" } },
                    ],
                  },
                ]
              : []),
          ],
        },
      },
      {
        $addFields: {
          searchScore: {
            $add: [
              { $cond: [{ $eq: [{ $toLower: "$userName" }, q.toLowerCase()] }, 10, 0] },
              {
                $cond: [
                  { $regexMatch: { input: "$userName", regex: `^${escaped}`, options: "i" } },
                  5,
                  0,
                ],
              },
              {
                $cond: [
                  { $regexMatch: { input: "$firstName", regex: `^${escaped}`, options: "i" } },
                  3,
                  0,
                ],
              },
            ],
          },
        },
      },
      { $sort: { searchScore: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          userName: 1,
          firstName: 1,
          lastName: 1,
          bio: 1,
          profileImage: 1,
          accountType: 1,
          searchScore: 1,
        },
      },
    ]);

    if(req.cacheKey){
      try{
        await redisClient.setEx(req.cacheKey,300,JSON.stringify(users));
      }catch(error){
        console.error("Redis cache write error:",error.message);
      }
    }

    return res.status(200).json(new ApiResponse(200,"search data fetched successfully",users));
})

const searchUserSuggestion = asyncHandler(async (req, res) => {
    const q = req.query.q?.trim();
    if (!q || q.length < 2)
      throw new ApiError(400,"VALIDATION_ERROR","query must contain at least 2 characters");

    const limit = Math.min(20, Math.max(1, Number(req.query.limit) || 10));
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const words = escaped.split(/\s+/);
    const firstWord = words[0];
    const secondWord = words[1] || "";

    const users = await User.aggregate([
      {
        $match: {
          $or: [
            { userName: { $regex: `^${escaped}`, $options: "i" } },
            { firstName: { $regex: `^${escaped}`, $options: "i" } },
            ...(words.length >= 2
              ? [
                  {
                    $and: [
                      { firstName: { $regex: `^${firstWord}`, $options: "i" } },
                      { lastName: { $regex: `^${secondWord}`, $options: "i" } },
                    ],
                  },
                ]
              : []),
          ],
        },
      },
      {
        $addFields: {
          searchScore: {
            $add: [
              { $cond: [{ $eq: [{ $toLower: "$userName" }, q.toLowerCase()] }, 10, 0] },
              {
                $cond: [
                  { $regexMatch: { input: "$userName", regex: `^${escaped}`, options: "i" } },
                  5,
                  0,
                ],
              },
              {
                $cond: [
                  { $regexMatch: { input: "$firstName", regex: `^${escaped}`, options: "i" } },
                  3,
                  0,
                ],
              },
            ],
          },
        },
      },
      { $sort: { searchScore: -1 } },
      { $limit: limit },
      {
        $project: {
          userName: 1,
          firstName: 1,
          lastName: 1,
          bio: 1,
          profileImage: 1,
          searchScore: 1,
        },
      },
    ]);

    if(req.cacheKey){
      try{
        await redisClient.setEx(req.cacheKey,120,JSON.stringify(users));
      }catch(error){
        console.error("Redis cache write error:",error.message);
      }
    }

    return res.status(200).json(new ApiResponse(200,"suggestion fetched successfully",users));
})

module.exports = {
    searchUsers,
    searchUserSuggestion
};