const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const validateResult = (req, res, next) => {
        const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new ApiError(400,"VALIDATION_ERROR","Validation failed",errors.array().map(err => ({
            field:err.path,
            message: err.msg
        })));
        }
  next();
}

module.exports = {
    validateResult,
}