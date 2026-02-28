const { default: mongoose } = require("mongoose");
const Connection = require("../models/Connection");
const User = require("../models/User");

const sendConnection = async (req,res) =>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        if(!fromUserId || !toUserId || !status) return res.status(400).json({
            message:"Invalid Resquest,"
        })
        
        if(!mongoose.Types.ObjectId.isValid(fromUserId) || !mongoose.Types.ObjectId.isValid(toUserId)) return res.status(400).json({
            message:"Invalid Request , user id must be valid",
        })
        
        if(status!= "blocked" && status!= "requested" && status!= "ignored")
            return res.status(400).json({
            message:"Invalid status resquest,"
        })

        if(fromUserId.equals(toUserId)){
            return res.status(400).json({
                message:"User cannot send self request",
            });
        }

        const toUser = await User.findOne({
            _id:toUserId,
        })

        if(!toUser) return res.status(400).json({
            message:"Receiver Not Found",
        })

        const existingRequest = await Connection.findOne({
            $or : [
                {
                    fromUserId,
                    toUserId
                },{
                    fromUserId:toUserId,
                    toUserId:fromUserId
                }
            ]
        });

        if(!existingRequest){
            await Connection.create({
                fromUserId,
                toUserId,
                status,
            })
            res.status(201).json({
            message:"User request sent successfully",
             })
        }

        res.send("Working on");
        
    }catch(err){
        res.status(400).json({
            message:err.message,
        })
    }
}


module.exports = {
    sendConnection,
}