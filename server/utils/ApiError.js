class ApiError extends Error{
    constructor(statusCode=500,errorCode="INTERNAL_SERVER_ERROR",
        message="Internal Server Error",errors = []){
        super(message);
        this.success = false;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.errors = errors;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ApiError;