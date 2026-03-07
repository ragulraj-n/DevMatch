const {body} = require("express-validator");


const loginUserValidate = [

    body("email")
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail(),

    body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password length must be 8")

]

const registerUserValidate = [
    body("firstName")
    .trim()
    .isLength({min:3, max:50})
    .withMessage("First Name must be 3-50 characters")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name must contain only letters"),

    body("lastName")
    .trim()
    .isLength({min:1, max:50})
    .withMessage("Last Name must be 1-50 characters")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name must contain only letters"),

    body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail()  // converts to lowercase + standard format
    .isLength({ max: 100 })
    .withMessage("Email too long"),

    body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),

]

const forgotPasswordValidate = [
    body("email")
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail(),
]

const resetPasswordValidate = [
    body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
]

const changePasswordValidate = [
     body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),

     body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
]

module.exports = {
    loginUserValidate,
    registerUserValidate,
    forgotPasswordValidate,
    resetPasswordValidate,
    changePasswordValidate
}