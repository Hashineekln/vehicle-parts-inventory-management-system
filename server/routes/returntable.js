import express from 'express';
import { getReturnitems } from '../controllers/returntable.js';

const router = express.Router();

router.get('/returnitems', getReturnitems) 



export default router;
