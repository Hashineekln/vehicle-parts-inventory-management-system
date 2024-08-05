import express from 'express';
import { getSuppliers, getSupplier, addSupplier, updateSupplier} from '../controllers/supplier.js';

const router = express.Router();

router.get('/', getSuppliers);
router.get('/:id', getSupplier);
router.post('/', addSupplier);
router.put('/:id', updateSupplier);


export default router;
