import db from '../db.js';

// Get all vehicle parts with their categories and shelves
export const getVehicleparts = async (req, res) => {
    const sql = `
        SELECT vp.part_no, vp.part_name, vp.price, vp.threshold_no, vp.quantity, 
               c.name as category_name, s.shelf_id,vt.year ,
               GROUP_CONCAT(vt.model SEPARATOR ', ') as models
        FROM vehicle_part vp
        LEFT JOIN vehicle_part_has_vehicle_type vpt ON vp.part_no = vpt.vehicle_part_part_no
        LEFT JOIN vehicle_type vt ON vpt.vehicle_type_vehicle_id = vt.vehicle_id
        LEFT JOIN category c ON vp.category_category_id = c.category_id
        LEFT JOIN shelf s ON vp.shelf_shelf_id = s.shelf_id
        GROUP BY vp.part_no, vp.part_name, vp.price, vp.threshold_no, vp.quantity, c.name, s.shelf_id,vt.year
    `;
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching vehicle parts:', err);
            return res.status(500).json({ error: "Error fetching data", details: err.message });
        }

        return res.json(data);
    });
};




// Get a single vehicle part with its models by part_no
export const getVehiclepart = async (req, res) => {
    const partNo = req.params.part_no;

    try {
        console.log(`Fetching part with part_no: ${partNo}`);
        
        
        const query = `
            SELECT vp.part_no, vp.part_name, vp.price, vp.threshold_no, vp.quantity,vp.image_url,vp.category_category_id, vp.shelf_shelf_id,
                   c.name AS category_name, s.shelf_id,
                   GROUP_CONCAT(vt.model SEPARATOR ', ') AS models
            FROM vehicle_part vp
            LEFT JOIN vehicle_part_has_vehicle_type vpt ON vp.part_no = vpt.vehicle_part_part_no
            LEFT JOIN vehicle_type vt ON vpt.vehicle_type_vehicle_id = vt.vehicle_id
            LEFT JOIN category c ON vp.category_category_id = c.category_id
            LEFT JOIN shelf s ON vp.shelf_shelf_id = s.shelf_id
            WHERE vp.part_no = ?
            GROUP BY vp.part_no, vp.part_name, vp.price, vp.threshold_no, vp.quantity,vp.image_url, c.name, s.shelf_id;
        `;

        db.query(query, [partNo], (err, results) => {
            if (err) {
                console.error('Error fetching vehicle part:', err);
                return res.status(500).json({ error: 'Error fetching vehicle part. Please try again.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Vehicle part not found' });
            }

            const part = results[0];
            console.log('Part details:', part);

            res.status(200).json(part);
        });
    } catch (error) {
        console.error('Error fetching vehicle part:', error);
        res.status(500).json({ error: 'Error fetching vehicle part. Please try again.' });
    }
};
// Add a new vehicle part
export const addVehiclepart = async (req, res) => {
    const { part_no, part_name, price, threshold_no, quantity, image_url, category_id, shelf_id, vehicle_type_ids } = req.body;

    if (!part_no || !part_name || !price || !threshold_no || !category_id || !shelf_id || vehicle_type_ids.length === 0) {
        return res.status(400).json({ error: "Required fields are missing" });
    }

    const sql = `INSERT INTO vehicle_part (part_no, part_name, price, threshold_no, quantity, image_url, category_category_id, shelf_shelf_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [part_no, part_name, price, threshold_no, quantity || null, image_url || null, category_id, shelf_id];

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
    const partNo = req.params.part_no;
    const { part_name, price, threshold_no, quantity, category_id, shelf_id, image_url, vehicle_type_ids } = req.body;

    try {
        // Update vehicle part details in the vehicle_part table
        await db.query(`
            UPDATE vehicle_part 
            SET part_name = ?, price = ?, threshold_no = ?, quantity = ?, category_category_id = ?, shelf_shelf_id = ?, image_url = ?
            WHERE part_no = ?`, 
            [part_name, price, threshold_no, quantity, category_id, shelf_id, image_url, partNo]
        );

        // Delete existing vehicle type associations
        await db.query(`
            DELETE FROM vehicle_part_has_vehicle_type 
            WHERE vehicle_part_part_no = ?`, 
            [partNo]
        );

        // Insert updated vehicle type associations
        if (vehicle_type_ids && vehicle_type_ids.length > 0) {
            const values = vehicle_type_ids.map(vehicleId => [partNo, vehicleId]);
            await db.query(`
                INSERT INTO vehicle_part_has_vehicle_type (vehicle_part_part_no, vehicle_type_vehicle_id) 
                VALUES ?`, 
                [values]
            );
        }

        res.status(200).json({ message: 'Vehicle part updated successfully' });
    } catch (error) {
        console.error('Error updating vehicle part:', error);
        res.status(500).json({ error: 'Error updating vehicle part. Please try again.' });
    }
};




// Get all vehicle part has vehicle type relationships for forms checkboxes
export const getVehiclePartHasVehicleType = async (req, res) => {
    const sql = 'SELECT * FROM vehicle_part_has_vehicle_type';
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching data" });
        }
        return res.json(data);
    });
};
