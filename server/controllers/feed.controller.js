const Connection  = require("../models/Connection");
const User = require("../models/User")

const sendFeed = async (req,res) =>{
    try{
        const skip = req.query.skip || 0;
        const limit = req.query.limit || 10;
        const loggedInUser = req.user;
        const hideUsers = new Set();

        const userConnection = await Connection.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        userConnection.forEach(conn=>{
            hideUsers.add(conn.fromUserId);
            hideUsers.add(conn.toUserId);
        })    

        hideUsers.add(loggedInUser._id);

        const users = await User.find({
            _id: { $nin: [...hideUsers]},
        })
        .skip(skip*limit)
        .limit(limit);

        res.status(200).json({message: "user data fetced successfully",
            data:users,
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }

}

module.exports = {
    sendFeed,
}