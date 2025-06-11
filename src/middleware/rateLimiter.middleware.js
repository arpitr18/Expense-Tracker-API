import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("My-rate-limit");
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (err) {
    console.log("Rate Limit Error: ", err);
    next(err);
  }
};

export default ratelimiter;
