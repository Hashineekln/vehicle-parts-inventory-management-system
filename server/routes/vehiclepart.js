import express from 'express';
import {addVehiclepart,getVehicleparts, updateVehiclePart, deleteVehiclepart, getVehiclePartHasVehicleType } from '../controllers/vehiclepart.js';
//getVehiclepart
const router = express.Router();

// Routes for vehicle parts
router.get('/', getVehicleparts); // Get all vehicle parts
//router.get('/:id', getVehiclepart); // Get a single vehicle part by id
router.post('/', addVehiclepart); // Add a new vehicle part

router.put('/vehiclepart/:part_no', updateVehiclePart);
 // Update an existing vehicle part
router.delete('/:id', deleteVehiclepart); // Delete a vehicle part

// Separate route for vehiclepart_has_vehicle_type
router.get('/vehicleparthasvehicletype', getVehiclePartHasVehicleType); // Get all vehiclepart_has_vehicle_type

export default router;
