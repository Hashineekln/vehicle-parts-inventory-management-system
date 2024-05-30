import db from '../db.js';

// Function to get vehicle types
export const getVehicleTypes = async (req, res) => {
  try {
    const sql = 'SELECT DISTINCT brand, model, year FROM vehicle_type';
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching vehicle types", details: err.message });
      }
      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get categories
export const getCategories = async (req, res) => {
  try {
    const sql = 'SELECT DISTINCT name FROM category';
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching categories", details: err.message });
      }
      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get vehicle parts based on brand, model, year, and category
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
          SELECT vehicle_part_part_no 
          FROM vehicle_part_has_vehicle_type 
          WHERE vehicle_type_vehicle_id = ?
        `;
        db.query(getPartNosQuery, [vehicleId], (err, vehiclePartHasVehicleTypeResults) => {
          if (err) {
            return res.status(500).json({ error: "Error fetching vehicle part data", details: err.message });
          }

          const partNos = vehiclePartHasVehicleTypeResults.map(row => row.vehicle_part_part_no);

          if (partNos.length === 0) {
            return res.status(404).json({ error: 'No parts found for this vehicle type' });
          }

          // Step 4: Get vehicle part details from vehicle_part table with category filter
          const getVehiclePartsQuery = `
            SELECT part_no, part_name, price, quantity, image_url ,shelf_shelf_id,category_category_id
            FROM vehicle_part 
            WHERE part_no IN (?) AND category_category_id IN (?)
          `;
          db.query(getVehiclePartsQuery, [partNos, categoryIds], (err, vehiclePartsResults) => {
            if (err) {
              return res.status(500).json({ error: "Error fetching vehicle parts data", details: err.message });
            }

            res.json(vehiclePartsResults);
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
