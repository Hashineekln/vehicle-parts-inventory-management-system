import express from 'express';
import { getVehicles, getVehicle, addVehicle, updateVehicle } from '../controllers/vehicletype.js';
//check whter to include verufy tokens
const router = express.Router();

router.get('/', getVehicles) 
router.get('/:id', getVehicle)
router.post('/', addVehicle)
router.put('/:id', updateVehicle);


export default router;


