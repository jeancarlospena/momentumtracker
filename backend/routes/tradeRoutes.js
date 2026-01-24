import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { saveMultipleTrades, getTrades } from "../controllers/tradeController.js";

const router = express.Router()

router.post('/save-trades', requireAuth, saveMultipleTrades)

router.get('/get-trades/:accountId', requireAuth, getTrades)

export default router