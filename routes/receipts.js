import express from "express";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let receipts = [];

//all routes here start with /receipts
router.get("/", (req, res) => {
  res.send(receipts);
});

router.post('/', (req,res)=>{
    const receipt = req.body;
    const receiptId = uuidv4();
    const receiptWithId = {...receipt, id: receiptId}
    receipts.push(receiptWithId)
    res.send(`Receipt with id ${receiptWithId.id} was added`)
})

router.get('/:id', (req, res)=>{

  const { id } = req.params;
  const receiptForPoints = receipts.find((receipt) => receipt.id === id)
  res.send(receiptForPoints)
})


//TODO: Calculate (before adding the receipt) and Get points instead of retailer
router.get('/:id/points', (req, res)=>{

  const { id } = req.params;
  const receiptForPoints = receipts.find((receipt) => receipt.id === id)
  res.send(`points: ${receiptForPoints.retailer}`)
})

export default router;
