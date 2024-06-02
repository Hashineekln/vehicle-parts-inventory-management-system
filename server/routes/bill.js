import express from 'express';
import { createBill , createBillItem } from '../controllers/bill.js';

const router = express.Router();

// Route to create a new bill
router.post('/', createBill);

// Route to create a new bill item associated with a specific bill
router.post('/:billId', createBillItem);

export default router;

