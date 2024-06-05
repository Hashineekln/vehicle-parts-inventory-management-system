import express from 'express';
import { getBills, getBill } from  '../controllers/billdetails.js';
const router = express.Router();

router.get('/bills', getBills);
router.get('/bills/:id', getBill);


export default router;
