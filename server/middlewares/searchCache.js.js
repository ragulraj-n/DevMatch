const { redisClient } = require("../config/redis");
const ApiResponse = require("../utils/ApiResponse");

const searchCache = (type) => {
    return async (req,res,next) => {
        try{
            const q = req.query.q?.trim().toLowerCase();
            if(!q || q.length < 2) return next();

            const page = Math.max(1,Number(req.query.page) || 1);
            const limit = Math.min(20,Math.max(1,Number(req.query.limit) || 10));

            let cacheKey;

            if(type === "search"){
                cacheKey = `search:${q}:page:${page}:limit:${limit}`;
            }else if(type === "suggestion"){
                cacheKey = `suggestion:${q}:limit:${limit}`;
            }else{
                return next();
            }

            const cachedData = await redisClient.get(cacheKey);

            if(!cachedData){
            console.log("CACHE MISS:",cacheKey);
            req.cacheKey = cacheKey;
            return next();
        }

console.log("CACHE HIT:",cacheKey);

            if(!cachedData){
                req.cacheKey = cacheKey;
                return next();
            }

            const data = JSON.parse(cachedData);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    type === "search" ? "search data fetched successfully" : "suggestion fetched successfully",
                    data
                )
            );
        }catch(error){
            console.error("Redis cache read error:",error.message);
            return next();
        }
    }
}

module.exports = searchCache;