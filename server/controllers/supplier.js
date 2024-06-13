import db from '../db.js';

// Get all suppliers
export const getSuppliers = async (req, res) => {
    const sql = 'SELECT * FROM supplier';
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

// Get a specific supplier by ID
export const getSupplier = async (req, res) => {
    const sql = 'SELECT * FROM supplier WHERE supplier_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

// Add a new supplier
export const addSupplier = async (req, res) => {
    const sql = 'INSERT INTO supplier (first_name, last_name, company_name,address_line1,address_line2,address_line3,phone) VALUES (?, ?, ?,?, ?, ?,?)';
    const values = [
        req.body.first_name, 
        req.body.last_name,
        req.body.company_name,
        req.body.address_line1,
        req.body.address_line2,
        req.body.address_line3,
        req.body.phone
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json({ error: "Error adding data" });
        return res.json(data);
    });
};

// Update an existing supplier
export const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, company_name, address_line1, address_line2, address_line3, phone } = req.body;

    const sql = 'UPDATE supplier SET first_name = ?, last_name = ?, company_name = ?, address_line1 = ?, address_line2 = ?, address_line3 = ?, phone = ? WHERE supplier_id = ?';
    db.query(sql, [first_name, last_name, company_name, address_line1, address_line2, address_line3, phone, id], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: "Database error", error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Supplier updated successfully" });
    });
};


// Delete a supplier
export const deleteSupplier = async (req, res) => {
    const sql = 'DELETE FROM supplier WHERE supplier_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error deleting data" });
        return res.json(data);
    });
};
