import ratelimit from "../config/upstash.js"; // Importing the rate limiter configuration

const rateLimiter = async (req, res, next) => {
  // Rate limiting logic here

  try {
    const {success} = await ratelimit.limit("my-limit-key");
    // If rate limit is exceeded, return 429 status
    if (!success) {
      return res.status(429).json({ message: "too many requests please try again later" });
    }
    next();
    
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(error);
    
  }
};

export default rateLimiter;