import express from 'express';
import { getVehicleparts, getVehiclepart, addVehiclepart, updateVehiclepart, deleteVehiclepart, getVehiclePartHasVehicleType } from '../controllers/vehiclepart.js';

const router = express.Router();

// Routes for vehicle parts
router.get('/', getVehicleparts); // Get all vehicle parts
router.get('/:id', getVehiclepart); // Get a single vehicle part by id
router.post('/', addVehiclepart); // Add a new vehicle part
router.put('/:id', updateVehiclepart); // Update an existing vehicle part
router.delete('/:id', deleteVehiclepart); // Delete a vehicle part

// Separate route for vehiclepart_has_vehicle_type
router.get('/vehicleparthasvehicletype', getVehiclePartHasVehicleType); // Get all vehiclepart_has_vehicle_type

export default router;
