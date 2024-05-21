import express from 'express';
import { getSuppliers, getSupplier, addSupplier, updateSupplier, deleteSupplier } from '../controllers/supplier.js';

const router = express.Router();

router.get('/', getSuppliers);
router.get('/:id', getSupplier);
router.post('/', addSupplier);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;
