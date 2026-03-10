const User = require("../models/User");

const searchUsers = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q || q.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must contain at least 2 characters",
      });
    }

    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    if(limit>20) limit=20;
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
    
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const searchUserSuggestion = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q || q.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must contain at least 2 characters",
      });
    }

    const limit = Number(req.query.limit) || 10;
    if(limit>20) limit=10;
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
    
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { searchUsers,
    searchUserSuggestion
};