import db from '../db.js';
//import jwt from 'jsonwebtoken';



export const getClients = async (req, res) => {
    const sql = 'SELECT * FROM customer';
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

export const getClient = async (req, res) => {
    const sql = 'SELECT * FROM customer WHERE customer_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    })};


    export const addClient = async (req, res) => {
        const sql = 'INSERT INTO customer (first_name, last_name) VALUES (?, ?)';
        const values = [
            req.body.first_name, 
            req.body.last_name
        ];
        db.query(sql, values, (err, data) => {
            if (err) return res.json({ error: "Error adding data" });
            return res.json(data);
        });
    };
    
    

    export const updateClient = async (req, res) => {
        const { id } = req.params;
        const { first_name, last_name } = req.body;
    
        const sql = 'UPDATE customer SET first_name = ?, last_name = ? WHERE customer_id = ?'; // Fixed WHERE clause
        db.query(sql, [first_name, last_name, id], (error, results) => {
          if (error) {
            return res.status(500).json({ message: "Database error", error });
          }
          if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Client not found" });
          }
          res.status(200).json({ message: "Client updated successfully" });
        });
    };
    
      




export const deleteClient = async (req, res) => {
    const sql = 'DELETE FROM customer WHERE customer_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error deleting data" });
        return res.json(data);
    });
};
