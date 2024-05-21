import db from '../db.js';

// Get all vehicle parts with their categories and shelves

    export const getVehicleparts = async (req, res) => {
        const sql = `SELECT vp.*, vt.model
                     FROM vehicle_part vp
                     LEFT JOIN vehicle_part_has_vehicle_type vpt ON vp.part_no = vpt.vehicle_part_part_no
                     LEFT JOIN vehicle_type vt ON vpt.vehicle_type_vehicle_id = vt.vehicle_id`;
        db.query(sql, (err, data) => {
            if (err) {
                console.error('Error fetching vehicle parts:', err);
                return res.status(500).json({ error: "Error fetching data", details: err.message });
            }
            
            return res.json(data);
        });
    };

// Get a single vehicle part with its category and shelf by part_no
export const getVehiclepart = async (req, res) => {
    
        const sql = `SELECT vp.*, vt.model
                     FROM vehicle_part vp
                     LEFT JOIN vehicle_part_has_vehicle_type vpt ON vp.part_no = vpt.vehicle_part_part_no
                     LEFT JOIN vehicle_type vt ON vpt.vehicle_type_vehicle_id = vt.vehicle_id`;
        db.query(sql, (err, data) => {
            if (err) {
                console.error('Error fetching vehicle parts:', err);
                return res.status(500).json({ error: "Error fetching data", details: err.message });
            }
            console.log(data[2].model);
            return res.json(data);
        });
    };
// Add a new vehicle part
export const addVehiclepart = async (req, res) => {
    const { part_no, part_name, price, threshold_no, quantity, category_id, shelf_id, vehicle_type_ids } = req.body;

    if (!shelf_id || !category_id || vehicle_type_ids.length === 0) {
        return res.status(400).json({ error: "Required fields are missing" });
    }

    const sql = `INSERT INTO vehicle_part (part_no, part_name, price, threshold_no, quantity, category_id, shelf_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [part_no, part_name, price, threshold_no, quantity, category_id, shelf_id];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error adding vehicle part:', err);
            return res.status(500).json({ error: "Error adding data", details: err.message });
        }
        // Insert vehicle type relationships
        vehicle_type_ids.forEach(vehicle_id => {
            const insertRelationSql = 'INSERT INTO vehicle_part_has_vehicle_type (vehicle_part_part_no, vehicle_type_vehicle_id) VALUES (?, ?)';
            db.query(insertRelationSql, [part_no, vehicle_id], (err) => {
                if (err) {
                    console.error('Error adding vehicle part type relation:', err);
                }
            });
        });
        res.status(201).json({ message: "Vehicle part added successfully", partData: data });
    });
};

// Update an existing vehicle part
export const updateVehiclepart = async (req, res) => {
    const { part_no } = req.params;
    const { part_name, price, quantity, shelf_id } = req.body;

    const sql = 'UPDATE vehicle_part SET part_name = ?, price = ?, quantity = ?, shelf_id = ? WHERE part_no = ?';
    db.query(sql, [part_name, price, quantity, shelf_id, part_no], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Database error", error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Vehicle part not found or no changes were made" });
        }
        res.status(200).json({ message: "Vehicle part updated successfully" });
    });
};

// Delete a vehicle part
export const deleteVehiclepart = async (req, res) => {
    const sql = 'DELETE FROM vehicle_part WHERE part_no = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting data" });
        }
        return res.json({ message: "Vehicle part deleted successfully" });
    });
};
export const getVehiclePartHasVehicleType = async (req, res) => {
    const sql = 'SELECT * FROM vehicle_part_has_vehicle_type';
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching data" });
        }
        return res.json(data);
    });
};