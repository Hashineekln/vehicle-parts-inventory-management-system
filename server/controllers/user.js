import db from '../db.js';

// Fetch all users
export const getUsers = async (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

// Fetch a single user by ID
export const getUser = async (req, res) => {
    const sql = 'SELECT * FROM user WHERE user_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

// Update a user by ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { usertype, first_name, last_name, username, NIC, email, contact } = req.body;

    const sql = 'UPDATE user SET usertype = ?, first_name = ?, last_name = ?, username = ?, NIC = ?, email = ?, contact = ? WHERE user_id = ?';
    db.query(sql, [usertype, first_name, last_name, username, NIC, email, contact, id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Database error", error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    });
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    const sql = 'DELETE FROM user WHERE user_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error deleting data" });
        return res.json(data);
    });
};