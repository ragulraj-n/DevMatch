const Connection  = require("../models/Connection");
const User = require("../models/User")

const sendFeed = async (req,res) =>{
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const loggedInUser = req.user;
        const hideUsers = new Set();

        if(limit>30) limit=30;

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