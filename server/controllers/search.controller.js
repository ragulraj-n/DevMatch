const User = require("../models/User");
const asyncHandler = require("../utils/AsyncHandler");

const searchUsers = asyncHandler(async (req, res) => {
    const q = req.query.q?.trim();
    if (!q || q.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must contain at least 2 characters",
      });
    }

    const page = Math.min(1, Number(req.query.skip) || 1);
    const limit = Math.min(20, Number(req.query.limit) || 20);

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
              { $cond: [{ $eq: ["$userName", q] }, 10, 0] },
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

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
})

const searchUserSuggestion = asyncHandler(async (req, res) => {
    const q = req.query.q?.trim();
    if (!q || q.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must contain at least 2 characters",
      });
    }

    const limit = Math.min(20, Number(req.query.limit) || 10);
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
              { $cond: [{ $eq: ["$userName", q] }, 10, 0] },
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
          profileImage: 1,
          searchScore: 1, 
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
})

module.exports = { searchUsers,
    searchUserSuggestion
};