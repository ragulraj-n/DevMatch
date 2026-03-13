const rateLimit = require("express-rate-limit");
const ApiResponse = require("../utils/ApiResponse")
const createRateLimiter = (option) =>{

    const limiter = rateLimit({
        windowMs: option.windowMs || 60*1000,
        max: option.max || 30,
        handler: (req,res) =>{
            res.status(429).json(new ApiResponse(429,option.message || "Too Many Requests.Try again later few minutes"));
        }
    });

    return limiter;
}

module.exports = createRateLimiter;