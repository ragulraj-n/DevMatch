const {body, validationResult } = require("express-validator");

const validateEditProfile = [
    (req,res,next) =>{
    try{
        if(!req.body) return res.status(400).json({
            message:"Data required to edit",
        })

        const allowedList = ["firstName","lastName","userName","bio","profileImage","location","experienceLevel","availabilityStatus","skills","interests","github","linkedin","portfolio"];
    
        const isValid = Object.keys(req.body).every((key) => allowedList.includes(key));
        if(!isValid) res.status(400).json({
            message:"Unallowed data sent to edit profile",
        })
        next();
    }catch(err){
        res.status(400).json({
            message:err.message,
        })
    }
},

  body("firstName")
    .optional()
    .isString().withMessage("First name must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("First name must be 3-50 characters"),

  body("lastName")
    .optional()
    .isString().withMessage("Last name must be a string")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name must be 1-50 characters"),

  body("userName")
    .optional()
    .isString().withMessage("Username must be a string")
    .trim()
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username must be 3-20 characters and contain only letters, numbers, and underscore"),

  body("bio")
    .optional()
    .isString().withMessage("Bio must be a string")
    .trim()
    .isLength({ max: 300 })
    .withMessage("Bio must be less than 300 characters"),

  body("profileImage")
    .optional()
    .isString().withMessage("Profile image must be a string")
    .trim()
    .isURL()
    .withMessage("Profile image must be a valid HTTPS URL"),

    // image store in cloudnary and send imagelurl
    //require_protocol: true,
    //protocols: ["https"]
    // .matches(/\.(jpg|jpeg|png|webp)(\?.*)?$/i)
    //  .withMessage("Profile image must be a valid image URL"),

  body("location")
    .optional()
    .isString().withMessage("Location must be a string")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Location cannot exceed 100 characters"),

  body("experienceLevel")
    .optional()
    .isIn(["student", "fresher", "junior", "mid", "senior"])
    .withMessage("Invalid experience level"),

  body("availabilityStatus")
    .optional()
    .isIn(["available", "busy", "open_to_collab"])
    .withMessage("Invalid availability status"),

  body("skills")
    .optional()
    .isArray({ max: 10 })
    .withMessage("Skills must be an array with maximum 10 items"),

  body("skills.*")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Each skill must be 1-30 characters"),

  body("interests")
    .optional()
    .isArray({ max: 10 })
    .withMessage("Interests must be an array with maximum 10 items"),

  body("interests.*")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Each interest must be 1-30 characters"),

  body("github")
    .optional()
    .isString().withMessage("GitHub must be a string")
    .trim()
    .isURL({
      require_protocol: true,
      protocols: ["https"]
    })
    .withMessage("GitHub must be a valid HTTPS URL")
    .matches(/^https:\/\/(www\.)?github\.com\/.+$/)
    .withMessage("Must be a valid GitHub profile URL"),

  body("linkedin")
    .optional()
    .isString().withMessage("LinkedIn must be a string")
    .trim()
    .isURL({
      require_protocol: true,
      protocols: ["https"]
    })
    .withMessage("LinkedIn must be a valid HTTPS URL")
    .matches(/^https:\/\/(www\.)?linkedin\.com\/.+$/)
    .withMessage("Must be a valid LinkedIn profile URL"),

  body("portfolio")
    .optional()
    .isString().withMessage("Portfolio must be a string")
    .trim()
    .isURL({
      require_protocol: true,
      protocols: ["https"]
    })
    .withMessage("Portfolio must be a valid HTTPS URL"),

]

module.exports = {
    validateEditProfile,
}