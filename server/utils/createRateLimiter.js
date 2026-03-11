const rateLimit = require("express-rate-limit");

const createRateLimiter = (option) =>{

    const limiter = rateLimit({
        windowMs: option.windowMs || 60*1000,
        max: option.max || 30,
        handler: (req,res) =>{
            res.status(429).json({
                success: false,
                message: option.message || "Too Many Requests.Try again later few minutes"
            });
        }
    });

    return limiter;
}

module.exports = createRateLimiter;