const errorHandler = (err, req, res, next) => {

    if (err.name === "TokenExpiredError") {
        err.statusCode = 401;
        err.message = "Token expired";
        err.errorCode = "TOKEN_EXPIRED";
    }

    if (err.name === "JsonWebTokenError") {
        err.statusCode = 401;
        err.message = "Invalid token";
        err.errorCode = "TOKEN_INVALID";
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        statusCode,
        errorCode: err.errorCode || "INTERNAL_SERVER_ERROR",
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        stack:err.stack,
    });
};

module.exports = errorHandler;
