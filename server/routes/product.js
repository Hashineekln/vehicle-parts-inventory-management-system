
import express from 'express';
import {getVehicleTypes,getVehicleParts ,getCategories} from '../controllers/product.js';

const router = express.Router();

router.get('/vehicletype', getVehicleTypes);

router.post('/vehiclepart', getVehicleParts);

router.get('/category', getCategories);

export default router;


