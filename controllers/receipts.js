import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


let receipts = [];

export const getAllReceipts = (req, res) => {
    res.send(receipts);
}

export const getReceiptById = (req, res) => {

    const { id } = req.params;
    const receiptForPoints = receipts.find((receipt) => receipt.id === id)
    res.send(receiptForPoints)
}

export const getReceiptWithPoints = (req, res) => {

    const { id } = req.params;
    const receiptForPoints = receipts.find((receipt) => receipt.id === id)
    res.send(`points: ${receiptForPoints.points}`)
}

export const postReceipt = (req, res) => {
    const receipt = req.body;

    if (!receipt || !receipt.retailer || typeof receipt.retailer !== 'string' || !receipt.purchaseTime || typeof receipt.purchaseTime !== 'string' || !receipt.purchaseDate || typeof receipt.purchaseDate !== 'string' || !receipt.items || !receipt.total || typeof receipt.total !== 'string') {
        return res.status(400).json({ error: 'The receipt is invalid' });
    }

    const receiptId = uuidv4();
    const receiptPoints = calculatePoints(receipt)
    const receiptWithId = { ...receipt, id: receiptId }
    const receiptWithPoints = { ...receiptWithId, points: receiptPoints }
    receipts.push(receiptWithPoints)
    res.send(`Receipt with id ${receiptWithId.id} was added`)
}

//main function to calculate points
const calculatePoints = (receipt) => {
    var totalPoints = 0
    let pointsForRetName = calculateRetName(receipt.retailer)
    let pointsForRoundTotal = calculatePointsForRoundTotal(receipt.total)
    let pointsForTotalMultiple = calculatePointsForTotalMultiple(receipt.total)
    let pointsForItems = calculatePointsForItems(receipt.items)
    let pointsForDescription = calculatePointsForDescription(receipt.items)
    let pointsForDate = calculatePointsForDate(receipt.purchaseDate)
    let pointsForTime = calculatePointsForTime(receipt.purchaseTime)
    totalPoints = pointsForRetName + pointsForRoundTotal + pointsForTotalMultiple + pointsForItems + pointsForDescription + pointsForDate + pointsForTime
    return totalPoints
}

//rule #1: One point for every alphanumeric character in the retailer name.
const calculateRetName = (retailer) => {
    let retailerName = retailer.replace(/[^a-zA-Z0-9]/g, '');
    return retailerName.length;
}

//rule #2: 50 points if the total is a round dollar amount with no cents.
const calculatePointsForRoundTotal = (total) => {
    return total % 1 === 0 ? 50 : 0;
}

//rule #3: 25 points if the total is a multiple of 0.25.
const calculatePointsForTotalMultiple = (total) => {
    return total % 0.25 === 0 ? 25 : 0;
}

//rule #4: 5 points for every two items on the receipt.
const calculatePointsForItems = (items) => {
    return Math.floor(items.length / 2) * 5;
}

//rule #5: If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and 
//round up to the nearest integer. The result is the number of points earned.
const calculatePointsForDescription = (items) => {
    return items.reduce((points, item) => {
        const trimDescription = item.shortDescription.trim().length;
        if (trimDescription % 3 === 0) {
            points += Math.ceil(item.price * 0.2);
        }
        return points;
    }, 0);

}

//rule #6: 6 points if the day in the purchase date is odd.
const calculatePointsForDate = (purchaseDate) => {
    const date = moment(purchaseDate, 'YYYY-MM-DD');
    const day = date.date();

    return day % 2 !== 0 ? 6 : 0;
}

//rule #7: 10 points if the time of purchase is after 2:00pm and before 4:00pm.
const calculatePointsForTime = (time) => {
    let points = 0
    const startTime = "14:00"; // 2:00 PM, assuming the format is 24-hour since the example reciept states "13:01"
    const endTime = "16:00";   // 4:00 PM

    if (time >= startTime && time <= endTime) {
        points = 10
    }

    return points;
}