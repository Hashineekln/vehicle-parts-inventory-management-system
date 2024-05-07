import db from '../db.js';
//import jwt from 'jsonwebtoken';



export const getVehicles = async (req, res) => {
    const sql = 'SELECT * FROM vehicle_type';
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

export const getVehicle= async (req, res) => {
    const sql = 'SELECT * FROM vehicle_type WHERE vehicle_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    })};


    export const addVehicle = async (req, res) => {
        const sql = 'INSERT INTO vehicle_type (brand, model, year) VALUES (?, ?, ?)'; // Added placeholders for all values
        const values = [
            req.body.brand, 
            req.body.model,
            req.body.year
        ];
        db.query(sql, values, (err, data) => {
            if (err) {
                console.error('Error adding data:', err); // Log the error for debugging purposes
                return res.status(500).json({ error: "Error adding data", details: err.message }); // Return specific error message with details
            }
            return res.status(200).json(data); // Return data if insertion is successful
        });
    };
    
    
    

    export const updateVehicle = async (req, res) => {
        const { id } = req.params;
        const { brand, model, year } = req.body;
    
        const sql = 'UPDATE vehicle_type SET brand = ?, model = ?, year = ? WHERE vehicle_id = ?'; // Fixed WHERE clause and added comma after 'model'
        db.query(sql, [brand, model, year, id], (error, results) => {
            if (error) {
                return res.status(500).json({ message: "Database error", error });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Vehicle not found" }); // Changed message from "Client not found" to "Vehicle not found"
            }
            res.status(200).json({ message: "Vehicle updated successfully" }); // Changed message from "Client updated successfully" to "Vehicle updated successfully"
        });
    };
    
    
      




export const deleteVehicle = async (req, res) => {
    const sql = 'DELETE FROM vehicle_type WHERE vehicle_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error deleting data" });
        return res.json(data);
    });
};
