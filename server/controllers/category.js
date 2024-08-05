import db from '../db.js';



export const getCategorys = async (req, res) => {
    const sql = 'SELECT * FROM category';
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

export const getCategory = async (req, res) => {
    const sql = 'SELECT * FROM category WHERE category_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    })};


    export const addCategory = async (req, res) => {
        const sql = 'INSERT INTO category (category_id, name) VALUES (?, ?)';
        const values = [
            req.body.category_id, 
            req.body.name
        ];
        db.query(sql, values, (err, data) => {
            if (err) return res.status(500).json({ error: "Error adding data", err });
            return res.status(200).json(data);
        });
    };
    
    
    //category id should not be able change as it is a primary key they can dete entirely and add new one
    
    export const updateCategory = async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
    
        const sql = 'UPDATE category SET name = ? WHERE category_id = ?';
        db.query(sql, [name, id], (error, results) => {
            if (error) {
                return res.status(500).json({ message: "Database error", error });
            }
            if (results.changedRows === 0) { // Check if any rows were updated
                return res.status(404).json({ message: "Category not found or no changes were made" });
            }
            res.status(200).json({ message: "Category updated successfully" });
        });
    };
    
    
    
    


export const deleteCategory = async (req, res) => {
    const sql = 'DELETE FROM category WHERE category_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error deleting data" });
        return res.json(data);
    });
};
