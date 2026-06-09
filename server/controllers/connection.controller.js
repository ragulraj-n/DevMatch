const { default: mongoose } = require("mongoose");
const Connection = require("../models/Connection");
const User = require("../models/User");
const asyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse");

const sendConnection = asyncHandler(async (req,res) =>{
        const fromUserId = req.user._id;
        const { toUserId , status } = req.params;
        const toUser = await User.findById(toUserId);

        if(!toUser) 
            throw new ApiError(404,"USER_NOT_FOUND","Receiver Not Found");

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
           return res.status(201).json(new ApiResponse(201,`user ${status} successfully`));
        }

        if(existingRequest.status==="accepted")
            throw new ApiError(409,"CONNECTION_ALREADY_EXISTS","Connection already exists");

        if(existingRequest.status === "rejected"){
            if(fromUserId.equals(existingRequest.toUserId)){
                existingRequest.fromUserId = fromUserId;
                existingRequest.toUserId = toUserId;
                existingRequest.status = status;
                await existingRequest.save();
                return res.status(201).json(new ApiResponse(201,`user ${status} successfully`));
            }
        }
        
        if(existingRequest.fromUserId.equals(fromUserId) && existingRequest.status === status){
            throw new ApiError(409,"CONNECTION_REQUEST_ALREADY_SENT",`user ${status} already`);
        }

        if(existingRequest.fromUserId.equals(fromUserId)){
            existingRequest.status = status;
            await existingRequest.save();
            return res.status(201).json(new ApiResponse(201,`user ${status} successfully`));
        }
        
        if(existingRequest.status === "ignored"){
            existingRequest.fromUserId = fromUserId;
            existingRequest.toUserId = toUserId;
            existingRequest.status = status;
            await existingRequest.save();
            return res.status(201).json(new ApiResponse(201,`Connection ${status} successfully`));
        }

        if(existingRequest.status === "requested"){
            existingRequest.status = "accepted";
           await existingRequest.save();
            return res.status(202).json(new ApiResponse(202,"Connection accepted successfully"));
        }
    
    throw new ApiError(400,"INVALID_CONNECTION_REQUEST","Invalid connection request");
})

const handleConnection = asyncHandler(async (req,res) =>{
    const {connectionId, status} = req.params;
    if(!connectionId || !status)
        throw new ApiError(400,"INVALID_REQUEST","connectionid or status missing");
    if(!mongoose.Types.ObjectId.isValid(connectionId))
        throw new ApiError(400,"INVALID_REQUEST","invalid connectionId");
    if(!(status==="accepted" || status==="rejected"))
        throw new ApiError(400,"INVALID_CONNECTION_STATUS","invalid status");

    const existingConnection  = await Connection.findById(connectionId);
    if(!existingConnection)
        throw new ApiError(404,"CONNECTION_NOT_FOUND","connection not found");
    if(!existingConnection.toUserId.equals(req.user._id))
        throw new ApiError(403,"FORBIDDEN","user can't access");

    if(!(existingConnection.status==="requested"))
        throw new ApiError(400,"INVALID_CONNECTION_STATUS","invalid status");

    existingConnection.status=status; 
    await existingConnection.save();
    res.status(200).json(new ApiResponse(200,`User request ${status} successfully`));
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
        .populate("_id")
        .populate("fromUserId","firstName lastName userName profileImage")
        .populate("toUserId","firstName lastName userName profileImage");

        const filteredConnections = connections.map(connection => ({
        connectionId: connection._id,
        ...(connection.fromUserId._id.equals(user._id)
            ? connection.toUserId.toObject()
            : connection.fromUserId.toObject())
    }));

        res.status(200).json(new ApiResponse(200,"connections fetched successfully",filteredConnections));

})

const getUserRequests = asyncHandler(async (req,res) =>{
        const user = req.user;
        const requestList = await Connection.find({
            toUserId:user._id,
            status:"requested"
        }).populate("fromUserId","firstName lastName profileImage userName");

        res.status(200).json(new ApiResponse(200,"pending requests fetched successfully",requestList));
})

const getUserSentRequests = asyncHandler(async (req,res) =>{
        const user = req.user;
        const requestList = await Connection.find({
            fromUserId:user._id,
            status:"requested"
        }).populate("toUserId","firstName lastName profileImage userName");

        res.status(200).json(new ApiResponse(200,"User sent pending requests fetched successfully",requestList));
})

const getUsersConnections = asyncHandler(async (req,res) =>{
        const {userId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(userId))
            throw new ApiError(400,"INVALID_REQUEST","invalid connectionId");
        const user = await User.findOne({_id:userId});
        if(!user) 
            throw new ApiError(400,"USER_NOT_FOUND","User not found");

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

        res.status(200).json(new ApiResponse(200,"user connections fetched successfully",filteredConnections));

});

const deleteConnection = asyncHandler(async (req,res) =>{
        const {connectionId} = req.params;
        const user = req.user;
        if(!mongoose.Types.ObjectId.isValid(connectionId))
            throw new ApiError(400,"INVALID_REQUEST","invalid connectionId");

        const connection = await Connection.findById(connectionId);
        if(!connection)
        throw new ApiError(404,"CONNECTION_NOT_FOUND","connection not found");

        if(!(user._id.equals(connection.fromUserId)||user._id.equals(connection.toUserId)))
        throw new ApiError(403,"FORBIDDEN","user can't access");

        await connection.deleteOne();
        res.status(200).json(new ApiResponse(200,"Connection deleted successfully"));
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