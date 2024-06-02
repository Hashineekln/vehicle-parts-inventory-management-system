import db from '../db.js';


export const getVehicleParts = async (req, res) => {
    console.log("Request body received:", req.body);
    const { brand, model, year, category } = req.body;
  
    if (!brand || !model || !year || !category || category.length === 0) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }
  
    try {
      // Step 1: Get vehicle_id from vehicle_type table
      const getVehicleIdQuery = `
        SELECT vehicle_id 
        FROM vehicle_type 
        WHERE brand = ? AND model = ? AND year = ?
      `;
      db.query(getVehicleIdQuery, [brand, model, year], (err, vehicleTypeResults) => {
        if (err) {
          return res.status(500).json({ error: "Error fetching vehicle type data", details: err.message });
        }
  
        if (vehicleTypeResults.length === 0) {
          return res.status(404).json({ error: 'No matching vehicle type found' });
        }
  
        const vehicleId = vehicleTypeResults[0].vehicle_id;
  
        // Step 2: Get category_ids from category table
        const getCategoryIdsQuery = `
          SELECT category_id 
          FROM category 
          WHERE name IN (?)
        `;
        db.query(getCategoryIdsQuery, [category], (err, categoryResults) => {
          if (err) {
            return res.status(500).json({ error: "Error fetching category data", details: err.message });
          }
  
          if (categoryResults.length === 0) {
            return res.status(404).json({ error: 'No matching categories found' });
          }
  
          const categoryIds = categoryResults.map(row => row.category_id);
  
          // Step 3: Get part_no from vehicle_part_has_vehicle_type table
          const getPartNosQuery = `
            SELECT vp.part_no, vp.part_name, vp.price, vp.quantity, vp.image_url, vp.shelf_shelf_id, vp.category_category_id
            FROM vehicle_part_has_vehicle_type vpv
            JOIN vehicle_part vp ON vp.part_no = vpv.vehicle_part_part_no
            WHERE vpv.vehicle_type_vehicle_id = ? AND vp.category_category_id IN (?)
          `;
          db.query(getPartNosQuery, [vehicleId, categoryIds], (err, vehiclePartsResults) => {
            if (err) {
              return res.status(500).json({ error: "Error fetching vehicle parts data", details: err.message });
            }
  
            if (vehiclePartsResults.length === 0) {
              return res.status(404).json({ error: 'No parts found for this vehicle type' });
            }
  
            res.json(vehiclePartsResults);
          });
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Function to get vehicle part stock by part number
  export const getVehiclePartStock = async (req, res) => {
    const { part_no } = req.params;
  
    if (!part_no) {
      console.error("Part number is required");
      return res.status(400).json({ error: 'Part number is required' });
    }
  
    try {
      const sql = 'SELECT quantity FROM vehicle_part WHERE part_no = ?';
      console.log("Executing SQL:", sql, [part_no]); // Log the SQL query
      db.query(sql, [part_no], (err, data) => {
        if (err) {
          console.error("Database error:", err.message); // Log the error message
          return res.status(500).json({ error: "Error fetching vehicle part stock", details: err.message });
        }
  
        if (data.length === 0) {
          console.error("Part not found");
          return res.status(404).json({ error: 'Part not found' });
        }
  
        console.log("Part stock data:", data[0]); // Log the fetched data
        res.json(data[0]);
      });
    } catch (error) {
      console.error("Unexpected error:", error.message); // Log unexpected errors
      res.status(500).json({ error: error.message });
    }
  };