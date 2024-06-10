import express from 'express';
import { getReport } from '../controllers/reportyear.js';

const router = express.Router();

router.get('/', getReport);


export default router;