import express from 'express';
import { getTransactions, getTransaction, addTransaction, updateTransaction } from '../controllers/transaction.js';

const router = express.Router();

router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.post('/', addTransaction);
router.put('/:id', updateTransaction);


export default router;
