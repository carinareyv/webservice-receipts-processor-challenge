import express from "express";

import { getAllReceipts, getReceiptById, getReceiptWithPoints, postReceipt } from "../controllers/receipts.js";

const router = express.Router();


//all routes here start with /receipts
router.get("/", getAllReceipts);

router.post('/process', postReceipt)

router.get('/:id', getReceiptById)


//TODO: Calculate (before adding the receipt) and Get points instead of retailer
router.get('/:id/points', getReceiptWithPoints)

export default router;
