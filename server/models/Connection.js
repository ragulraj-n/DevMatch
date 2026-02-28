const mongoose = require("mongoose");

const ConnectionSchema = mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,
    },
    status:{
        type:String,
        enum:["requested","ignored","accepted","rejected"],
        message: "Invalid connection status",
        default: "requested",
        required:true,
    }
},{
    timestamps:true,
})

ConnectionSchema.index(
  { fromUserId: 1, toUserId: 1 },
  { unique: true }
);

ConnectionSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();
});


module.exports = mongoose.model("Connection",ConnectionSchema);
