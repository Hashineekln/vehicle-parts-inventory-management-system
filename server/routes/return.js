import express from 'express';
import { createReturn } from '../controllers/return.js';

const router = express.Router();


router.post('/', createReturn)
//router.get('/:id', getBillDetailsById);


export default router;
