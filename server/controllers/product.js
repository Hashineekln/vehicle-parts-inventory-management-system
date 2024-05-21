import db from '../db.js';


// Function to get vehicle types
export const getVehicleTypes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vehicle_type');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getVehicleParts = async (req, res) => {
  const { brand, model, year } = req.body;
  try {
    const [rows] = await pool.query(`
      SELECT vp.part_no, vp.part_name, vp.price, vp.quantity, vp.image_url
      FROM vehicle_part vp
      JOIN vehicle_part_has_vehicle_type vpvt ON vp.part_no = vpvt.vehicle_part_part_no
      JOIN vehicle_type vt ON vt.vehicle_id = vpvt.vehicle_type_vehicle_id
      WHERE vt.brand = ? AND vt.model = ? AND vt.year = ?`, [brand, model, year]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};