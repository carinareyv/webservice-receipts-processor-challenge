import express from "express";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const receipts = [];

//all routes here start with /receipts
router.get("/", (req, res) => {
  res.send(receipts);
});

router.post('/', (req,res)=>{
    const receipt = req.body;
    const receiptId = uuidv4();
    const receiptWithId = {...receipt, id: receiptId}
    receipts.push(receiptWithId)
    res.send(`Receipt from retailer ${receipt.retailer} was added`)
})

export default router;
