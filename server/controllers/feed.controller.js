const Connection  = require("../models/Connection");
const User = require("../models/User")

const sendFeed = async (req,res) =>{
    try{
        const page = Math.min(1, Number(req.query.skip) || 1);
        const limit = Math.min(20, Number(req.query.limit) || 10);
        const loggedInUser = req.user;
        const hideUsers = new Set();
        const skip = (page-1)*limit;
        
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
        .skip(skip)
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