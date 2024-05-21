

import express from 'express';
import { getVehicleTypes, getVehicleParts } from '../controllers/product.js';

const router = express.Router();

router.get('/vehicletype', getVehicleTypes);
//router.post('/vehicletype/vehicleid', getVehicleId);
router.post('/vehiclepart', getVehicleParts);


export default router;