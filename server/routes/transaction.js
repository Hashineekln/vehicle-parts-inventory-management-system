import express from 'express';
import { getTransactions, getTransaction, addTransaction, updateTransaction, deleteTransaction } from '../controllers/transaction.js';

const router = express.Router();

router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.post('/', addTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
