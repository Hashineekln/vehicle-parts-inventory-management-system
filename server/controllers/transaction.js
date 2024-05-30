import db from '../db.js';

// Get all transactions
export const getTransactions = async (req, res) => {
    const sql = `SELECT * FROM transaction`;
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching data" });
        }
        return res.json(data);
    });
};

// Get a specific transaction by ID
export const getTransaction = async (req, res) => {
    const sql = `SELECT * FROM transaction WHERE transaction_id = ?`;
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching data" });
        }
        return res.json(data[0]); // Assuming we want a single transaction
    });
};

// Add a new transaction
export const addTransaction = async (req, res) => {
    const { quantity, vehicle_part_part_no, supplier_supplier_id, shelf_id } = req.body;

    if (!quantity || !vehicle_part_part_no || !supplier_supplier_id || !shelf_id) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = `
        INSERT INTO transaction (quantity, create_time, vehicle_part_part_no, supplier_supplier_id, shelf_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [quantity, createTime, vehicle_part_part_no, supplier_supplier_id, shelf_id];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error adding transaction:', err);
            return res.status(500).json({ error: "Error adding data", details: err.message });
        }

        const updateVehiclePartSql = `
            UPDATE vehicle_part 
            SET quantity = quantity + ? 
            WHERE part_no = ?
        `;
        const updateValues = [quantity, vehicle_part_part_no];

        db.query(updateVehiclePartSql, updateValues, (updateErr) => {
            if (updateErr) {
                console.error('Error updating vehicle part quantity:', updateErr);
                return res.status(500).json({ error: "Error updating vehicle part quantity", details: updateErr.message });
            }
            res.status(201).json({ message: "Transaction added successfully and vehicle part quantity updated", transactionData: data });
        });
    });
};




// Update an existing transaction
export const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { quantity, vehicle_part_part_no, supplier_supplier_id, shelf_id } = req.body;

    if (!quantity || !vehicle_part_part_no || !supplier_supplier_id || !shelf_id) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const getOldTransactionSql = 'SELECT * FROM transaction WHERE transaction_id = ?';
    
    db.query(getOldTransactionSql, [id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching old transaction data", details: err.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        const oldTransaction = data[0];

        const sql = `
            UPDATE transaction 
            SET quantity = ?, vehicle_part_part_no = ?, supplier_supplier_id = ?, shelf_id = ? 
            WHERE transaction_id = ?
        `;
        const values = [quantity, vehicle_part_part_no, supplier_supplier_id, shelf_id, id];

        db.query(sql, values, (updateErr, results) => {
            if (updateErr) {
                return res.status(500).json({ error: "Database error", details: updateErr.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Transaction not found or no changes were made" });
            }

            // Adjust the vehicle part quantity by subtracting the old transaction quantity and adding the new one
            const adjustVehiclePartSql = `
                UPDATE vehicle_part 
                SET quantity = quantity - ? + ? 
                WHERE part_no = ?
            `;
            const adjustValues = [oldTransaction.quantity, quantity, vehicle_part_part_no];

            db.query(adjustVehiclePartSql, adjustValues, (adjustErr) => {
                if (adjustErr) {
                    console.error('Error adjusting vehicle part quantity:', adjustErr);
                    return res.status(500).json({ error: "Error adjusting vehicle part quantity", details: adjustErr.message });
                }
                res.status(200).json({ message: "Transaction updated successfully and vehicle part quantity adjusted" });
            });
        });
    });
};


// Delete a transaction
export const deleteTransaction = async (req, res) => {
    const sql = 'DELETE FROM transaction WHERE transaction_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting data" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json({ message: "Transaction deleted successfully" });
    });
};
