// routes/accountRoutes.js
import express from "express";
import {
  createAccount,
  getUserAccounts,
  deleteAccount,
} from "../controllers/tradeAccountController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

// POST /api/accounts
router.post("/", requireAuth, createAccount);

// GET /api/accounts/:userId
router.get("/accounts", requireAuth, getUserAccounts);

// DELETE /api/accounts/:accountId
router.delete("/", requireAuth, deleteAccount);

export default router;
