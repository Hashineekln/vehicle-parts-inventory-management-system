import db from '../db.js';

export const getShelfs = async (req, res) => {
    const sql = 'SELECT * FROM shelf';
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

export const getShelf = async (req, res) => {
    const sql = 'SELECT * FROM shelf WHERE shelf_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};
export const addshelf = (req, res) => {

    const sql = 'INSERT INTO shelf (shelf_name) VALUES (?)';
    const values = [req.body.shelf_name];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error adding data:', err);
            return res.status(500).json({ error: "Error adding data", details: err.message });
        }
        return res.status(200).json(data);
    });
};

export const updateShelf = async (req, res) => {
    const { id } = req.params;
    const { shelf_name } = req.body;

    const sql = 'UPDATE shelf SET shelf_name = ? WHERE shelf_id = ?';
    db.query(sql, [shelf_name, id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Database error", error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Shelf not found" });
        }
        res.status(200).json({ message: "Shelf updated successfully" });
    });
};


