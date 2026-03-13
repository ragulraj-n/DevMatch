const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const validatesendConnection = (req,res,next) =>{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        if(!fromUserId || !toUserId || !status) 
            throw new ApiError(400,"INVALID_REQUEST","Missing request values");
        
        if(!mongoose.Types.ObjectId.isValid(fromUserId) || !mongoose.Types.ObjectId.isValid(toUserId)) 
            throw new ApiError(400,"INVALID_REQUEST","Invalid userID");
            
        
        if(status!= "requested" && status!= "ignored")
            throw new ApiError(400,"INVALID_CONNECTION_STATUS","Invalid request status");


        if(fromUserId.equals(toUserId))
            throw new ApiError(403,"CANNOT_CONNECT_SELF","user can't connect self");
    
    next();
}

module.exports = {
    validatesendConnection,
}