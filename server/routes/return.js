import express from 'express';
import { createReturn } from '../controllers/return.js';

const router = express.Router();


router.post('/', createReturn)



export default router;
