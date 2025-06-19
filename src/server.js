import express, { json } from "express";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.middleware.js";
import transactionsRoute from "./routes/transactions.route.js";
import initDB from "./config/ds.js";

dotenv.config();

const app = express();
// app.use(ratelimiter);

if (process.env.NODE_ENV === "production") job.start();

app.use(express.json());
app.use("/api/transactions", transactionsRoute);
const PORT = process.env.PORT;

app.get("/api/health", (req,res) => {
  res.status(200).json({
    status: "ok",
  });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
