import { sql } from "../config/ds.js";

export const getTransactionsByUserID = async (req, res) => {
  try {
    const { x } = req.params;

    const transaction = await sql`
    SELECT * FROM transactions WHERE user_id=${x} ORDER BY created_at DESC
    `;

    res.status(200).json(transaction);
  } catch (err) {
    console.log("Error getting transactions : ", err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const createTransactions = async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body;
    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({
        message: "All fields are requied!",
      });
    }

    const transaction = await sql`
    INSERT INTO transactions(user_id , title , amount , category)
    VALUES(${user_id} ,${title} ,${amount} ,${category} )
    RETURNING *
    `;

    res.status(201).json(transaction[0]);
  } catch (err) {
    console.log("Error creating transactions : ", err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const deleteTransactions = async (req, res) => {
  try {
    const { x } = req.params;
    const transaction = await sql`
    DELETE FROM transactions WHERE id=${x} RETURNING *
    `;

    if (transaction.length === 0) {
      res.status(404).json({
        message: "No Transactions found ",
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      data: transaction[0],
    });
  } catch (err) {
    console.log("Error deleted transactions : ", err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const summaryTransactions = async (req, res) => {
  try {
    const { x } = req.params;

    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount) , 0) as balance from transactions WHERE user_id = ${x}
    `;
    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount) , 0) as income from transactions WHERE user_id = ${x} AND amount > 0
    `;
    const expenseResult = await sql`
    SELECT COALESCE(SUM(amount) , 0) as expense from transactions WHERE user_id = ${x} AND amount < 0
    `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (err) {
    console.log("Error getting transactions : ", err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};
