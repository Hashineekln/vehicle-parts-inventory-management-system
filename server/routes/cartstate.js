import express from 'express';
import { getVehicleParts,getVehiclePartStock} from  '../controllers/cartstate.js';

const router = express.Router();

//router.get('/', getVehiclePartStock);

router.post('/vehicleparts', getVehicleParts);

// Route to get vehicle part stock by part number
router.get('/vehiclepart/:part_no', getVehiclePartStock);

export default router;

