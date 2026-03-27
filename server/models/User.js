const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        minlength: 3,
        maxlenght: 50,
        required: true,
        trim: true,
    },
    lastName:{
        type:String,
        minlength: 1,
        maxlenght: 50,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        index:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter valid email"],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    userName:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        index:true,
    },
    role:{
        type:String,
        enum:["user" , "admin"],
        default:"user",
    },
    bio:{
        type:String,
        maxlenght: 500,
    },
    profileImage:{
        imageUrl:{
            type:String,
            default:"",
        },
        publicId: {
            type: String,
            default: "",
        },
    },
    location:String,
    experienceLevel:{
        type:String,
        enum:["student","fresher","junior","mid","senior"],
        default:"fresher",
    },
    availabilityStatus:{
        type:String,
        enum:["available","busy","open_to_collab"],
        default:"available",
    },
    accountType:{
        type:String,
        enum:["normal","plus","premium"],
        default:"normal",
    },
    skills:{
        type:[String],
        default:[],
        
    },
    interests:{
        type:[String],
        default:[]
    },
    projects: [
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            maxlength: 500,
        },
        techStack: {
            type: [String],
            default: [],
        },
        githubLink: String,
        liveLink: String,
        image: String,
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
    ],
    github: String,
    linkedin: String,
    portfolio: String,
    isBlocked:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true,
})


module.exports = mongoose.model("User",userSchema);