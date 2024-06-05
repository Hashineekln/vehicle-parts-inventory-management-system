import express from 'express';
import { getCategoryCount, getPartCount, getTopSellingParts } from '../controllers/report.js';

const router = express.Router();

router.get('/categories/count', getCategoryCount);
router.get('/parts/count', getPartCount);
router.get('/billitems/top5', getTopSellingParts);

export default router;
