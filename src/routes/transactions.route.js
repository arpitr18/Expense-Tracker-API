import { Router } from "express";
import {
  createTransactions,
  deleteTransactions,
  getTransactionsByUserID,
  summaryTransactions,
} from "../controllers/transactions.controllers.js";

const router = Router();

router.get("/:x", getTransactionsByUserID);

router.post("/", createTransactions);

router.delete("/:x", deleteTransactions);

router.get("/summary/:x", summaryTransactions);

export default router;
