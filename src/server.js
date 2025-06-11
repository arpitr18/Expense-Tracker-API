import express, { json } from "express";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.middleware.js";
import transactionsRoute from "./routes/transactions.route.js";
import initDB from "./config/ds.js";

dotenv.config();

const app = express();
// app.use(ratelimiter);
app.use(express.json());
app.use("/api/transactions", transactionsRoute);
const PORT = process.env.PORT;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
