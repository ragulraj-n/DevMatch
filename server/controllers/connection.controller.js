const { default: mongoose } = require("mongoose");
const Connection = require("../models/Connection");
const User = require("../models/User");
const asyncHandler = require("../utils/AsyncHandler");

const sendConnection = asyncHandler(async (req,res) =>{

        const fromUserId = req.user._id;
        const { toUserId , status } = req.params;
        const toUser = await User.findById(toUserId);

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
})

const handleConnection = asyncHandler(async (req,res) =>{
        const {connectionId, status} = req.params;
    if(!connectionId || !status)
        return res.status(400).json({message:"Invalid request"});
    if(!mongoose.Types.ObjectId.isValid(connectionId))
        return res.status(400).json({message:"Invalid request id"});
    if(!(status==="accepted" || status==="rejected"))
        return res.status(400).json({message:"Invalid request status"});

    const existingConnection  = await Connection.findById(connectionId);
    if(!existingConnection)
        return res.status(404).json({message:"Connection not found"})
    if(!existingConnection.toUserId.equals(req.user._id))
        return res.status(401).json({message:"Unauthorized user access"});

    if(!(existingConnection.status==="requested"))
        return res.status(400).json({message:"Invalid request status"});

    existingConnection.status=status; 
    await existingConnection.save();
    res.status(200).json({message:`User request ${status} successfully`});
})

const getConnections = asyncHandler(async (req,res) =>{
        const user = req.user;
        const connections = await Connection.find({
            status:"accepted",
            $or :[
                {
                    fromUserId:user._id,
                },{
                    toUserId:user._id,
                }
            ]
        })
        .populate("fromUserId","firstName lastName userName profileImage")
        .populate("toUserId","firstName lastName userName profileImage");

        const filteredConnections = connections.map((data)=>{
            if(data.fromUserId._id.equals(user._id)) return data.toUserId;
            return data.fromUserId;
        })

        res.status(200).json({
            message:"user connections fetched successfully",
            connections:filteredConnections,
        })

})

const getUserRequests = asyncHandler(async (req,res) =>{
        const user = req.user;
        const requestList = await Connection.find({
            toUserId:user._id,
            status:"requested"
        }).populate("fromUserId","firstName lastName profileImage userName");

        res.status(200).json({message:"User pending requests fetched successfully",
            requestList,
        });
})

const getUserSentRequests = asyncHandler(async (req,res) =>{
        const user = req.user;
        const requestList = await Connection.find({
            fromUserId:user._id,
            status:"requested"
        }).populate("toUserId","firstName lastName profileImage userName");

        res.status(200).json({message:"User sent pending requests fetched successfully",
            requestList,
        });
})

const getUsersConnections = asyncHandler(async (req,res) =>{
        const {userId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(userId))
            return res.status(200).json({message:"Invalid request"});
        const user = await User.findOne({_id:userId});
        if(!user) return res.status(400).json({message:"User not exists"});

        const connections = await Connection.find({
            status:"accepted",
            $or :[
                {
                    fromUserId:user._id,
                },{
                    toUserId:user._id,
                }
            ]
        })
        .populate("fromUserId","firstName lastName userName profileImage")
        .populate("toUserId","firstName lastName userName profileImage");

        const filteredConnections = connections.map((data)=>{
            if(data.fromUserId._id.equals(user._id)) return toUserId;
            return data.fromUserId;
        })

        res.status(200).json({
            message:"user connections fetched successfully",
            connections:filteredConnections,
        })
})

const deleteConnection = asyncHandler(async (req,res) =>{
        const {connectionId} = req.params;
        const user = req.user;
        if(!mongoose.Types.ObjectId.isValid(connectionId))
            return res.status(400).json({message:"Invalid request"});

        const connection = await Connection.findById(connectionId);
        if(!connection)
            return res.status(404).json({message:"Connection not exists"});

        if(!(user._id.equals(connection.fromUserId)||user._id.equals(connection.toUserId)))
            return res.status(401).json({message:"Unauthorized access"});

        await connection.deleteOne();
        res.status(200).json({message:"Connection deleted successfully"});
})

module.exports = {
    sendConnection,
    handleConnection,
    getConnections,
    getUserRequests,
    getUserSentRequests,
    getUsersConnections,
    deleteConnection
}