const mongoose = require("mongoose");
const validatesendConnection = (req,res,next) =>{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        if(!fromUserId || !toUserId || !status) return res.status(400).json({
            message:"Invalid Resquest,"
        })
        
        if(!mongoose.Types.ObjectId.isValid(fromUserId) || !mongoose.Types.ObjectId.isValid(toUserId)) return res.status(400).json({
            message:"Invalid Request , user id must be valid",
        })
        
        if(status!= "requested" && status!= "ignored")
            return res.status(400).json({
            message:"Invalid status resquest,"
        })

        if(fromUserId.equals(toUserId)){
            return res.status(400).json({
                message:"User cannot send self request",
            });
        }
    
    next();
}

module.exports = {
    validatesendConnection,
}