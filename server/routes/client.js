import express from 'express';
import { getClients, getClient, addClient, updateClient } from '../controllers/client.js';
//check whter to include verufy tokens
const router = express.Router();

router.get('/', getClients) 
router.get('/:id', getClient)
router.post('/', addClient)
router.put('/:id', updateClient);


export default router;


