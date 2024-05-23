import db from '../db.js';

// Get all vehicle parts with their categories and shelves

export const getVehicleparts = async (req, res) => {
    const sql = `
        SELECT vp.part_no, vp.part_name, vp.price, vp.threshold_no, vp.quantity, 
               c.name as category_name, s.shelf_id, 
               GROUP_CONCAT(vt.model SEPARATOR ', ') as models
        FROM vehicle_part vp
        LEFT JOIN vehicle_part_has_vehicle_type vpt ON vp.part_no = vpt.vehicle_part_part_no
        LEFT JOIN vehicle_type vt ON vpt.vehicle_type_vehicle_id = vt.vehicle_id
        LEFT JOIN category c ON vp.category_category_id = c.category_id
        LEFT JOIN shelf s ON vp.shelf_shelf_id = s.shelf_id
        GROUP BY vp.part_no, vp.part_name, vp.price, vp.threshold_no, vp.quantity, c.name, s.shelf_id
    `;
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching vehicle parts:', err);
            return res.status(500).json({ error: "Error fetching data", details: err.message });
        }

        return res.json(data);
    });
};



// Get a single vehicle part with its category and shelf by part_no






// Add a new vehicle part
// Express route to add a new vehicle part
export const addVehiclepart = async (req, res) => {
    const { part_no, part_name, price, threshold_no, quantity, image_url, category_id, shelf_id, vehicle_type_ids } = req.body;

    if (!part_no || !part_name || !price || !threshold_no || !quantity || !image_url || !category_id || !shelf_id || vehicle_type_ids.length === 0) {
        return res.status(400).json({ error: "Required fields are missing" });
    }

    const sql = `INSERT INTO vehicle_part (part_no, part_name, price, threshold_no, quantity, image_url, category_category_id, shelf_shelf_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [part_no, part_name, price, threshold_no, quantity, image_url, category_id, shelf_id];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error adding vehicle part:', err);
            return res.status(500).json({ error: "Error adding data", details: err.message });
        }

        // Insert vehicle type relationships
        const insertRelationSql = 'INSERT INTO vehicle_part_has_vehicle_type (vehicle_part_part_no, vehicle_type_vehicle_id) VALUES ?';
        const vehicleTypeValues = vehicle_type_ids.map(vehicle_id => [part_no, vehicle_id]);

        db.query(insertRelationSql, [vehicleTypeValues], (err, result) => {
            if (err) {
                console.error('Error adding vehicle type relationships:', err);
                return res.status(500).json({ error: "Error adding vehicle type relationships", details: err.message });
            }

            res.status(200).json({ message: 'Vehicle part added successfully!' });
        });
    });
};



// Update an existing vehicle part
export const updateVehiclePart = async (req, res) => {
    const { part_no } = req.params;
    const { part_name, price, threshold_no, quantity, image_url, category_id, shelf_id, vehicle_type_ids } = req.body;

    if (!part_no || !part_name || !price || !threshold_no || !quantity || !image_url || !category_id || !shelf_id || vehicle_type_ids.length === 0) {
        return res.status(400).json({ error: "Required fields are missing" });
    }

    const vehiclePartSql = `
        UPDATE vehicle_part 
        SET part_name = ?, price = ?, threshold_no = ?, quantity = ?, image_url = ?, category_category_id = ?, shelf_shelf_id = ?
        WHERE part_no = ?`;
    const vehiclePartValues = [part_name, price, threshold_no, quantity, image_url, category_id, shelf_id, part_no];

    db.query(vehiclePartSql, vehiclePartValues, (err, data) => {
        if (err) {
            console.error('Error updating vehicle part:', err);
            return res.status(500).json({ error: "Error updating data", details: err.message });
        }

        const deleteSql = `DELETE FROM vehicle_part_has_vehicle_type WHERE vehicle_part_part_no = ?`;
        db.query(deleteSql, [part_no], (err) => {
            if (err) {
                console.error('Error deleting existing vehicle type relations:', err);
                return res.status(500).json({ error: "Error deleting existing vehicle type relations", details: err.message });
            }

            const insertSql = 'INSERT INTO vehicle_part_has_vehicle_type (vehicle_part_part_no, vehicle_type_vehicle_id) VALUES ?';
            const insertValues = vehicle_type_ids.map(vehicle_id => [part_no, vehicle_id]);

            db.query(insertSql, [insertValues], (err) => {
                if (err) {
                    console.error('Error adding vehicle part type relation:', err);
                    return res.status(500).json({ error: "Error adding vehicle type relations", details: err.message });
                }
                res.status(200).json({ message: "Vehicle part updated successfully" });
            });
        });
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