import express from 'express';
import {addVehiclepart,getVehicleparts
,    updateVehiclePart,  getVehiclePartHasVehicleType,getVehiclepart } from '../controllers/vehiclepart.js';
const router = express.Router();

// Routes for vehicle parts
router.get('/', getVehicleparts); // Get all vehicle parts
router.get('/:part_no', getVehiclepart); // Get a single vehicle part by id
router.post('/', addVehiclepart); // Add a new vehicle part

router.put('/:part_no', updateVehiclePart);
 // Update an existing vehicle part
//router.delete('/:part_no', deleteVehiclepart); // Delete a vehicle part

//router.get('/:part_no', getVehiclepartByPartNo); // Get all vehicle parts


// Separate route for vehiclepart_has_vehicle_type
router.get('/vehicleparthasvehicletype', getVehiclePartHasVehicleType); // Get all vehiclepart_has_vehicle_type

export default router;
