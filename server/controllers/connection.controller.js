const { default: mongoose } = require("mongoose");
const Connection = require("../models/Connection");
const User = require("../models/User");

const sendConnection = async (req,res) =>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

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
           return res.status(201).json({
            message:` user ${status} successfully`,
             })
        }

        if(existingRequest.status==="accepted")
            return res.status(400).json({
            message:`Invalid request , user already ${existingRequest.status}`,
        });

        if(existingRequest.status === "rejected"){
            if(fromUserId.equals(existingRequest.toUserId)){
                existingRequest.fromUserId = fromUserId;
                existingRequest.toUserId = toUserId;
                existingRequest.status = status;
                await existingRequest.save();
                return res.status(200).json({
                    message:`User ${status} successfully ,also if already rejected by user`,
                });
            }
        }
        
        if(existingRequest.fromUserId.equals(fromUserId) && existingRequest.status === status){
            return res.status(200).json({
                message: `User already ${status}`,
            })
        }

        if(existingRequest.fromUserId.equals(fromUserId)){
            existingRequest.status = status;
            await existingRequest.save();
            return res.status(201).json({
                message: `${status} successfully`,
            })
        }
        
        if(existingRequest.status === status){
            if(existingRequest.status === "requested"){
                existingRequest.status = "accepted";
                await existingRequest.save();
            }
            return res.status(200).json({
            message:`user ${status} successfully`,
        });
    }
        
        if(existingRequest.status === "ignored"){
            existingRequest.fromUserId = fromUserId;
            existingRequest.toUserId = toUserId;
            existingRequest.status = status;
            await existingRequest.save();
            return res.status(200).json({
                message:"User requested successfully ,also if already ignored by",
            });
        }

        if(existingRequest.status === "requested"){
            existingRequest.status = "accepted";
           await existingRequest.save();
            return res.status(200).json({
                message:"User requested accepted",
            });
        }
    
    return res.status(400).json({
    message: "Invalid connection action",
    });

    }catch(err){
        res.status(400).json({
            message:err.message,
        })
    }
}


module.exports = {
    sendConnection,
}