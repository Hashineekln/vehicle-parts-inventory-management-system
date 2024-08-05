import db from '../db.js';

// Fetch all users
export const getUsers = (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching users:", err.message);
            return res.status(500).json({ error: "Error fetching data", details: err.message });
        }
        res.status(200).json(data);
    });
};

// Fetch a single user by ID
export const getUser = (req, res) => {
    const sql = 'SELECT * FROM user WHERE user_id = ?';
    db.query(sql, [req.params.id], (err, data) => {
        if (err) {
            console.error("Error fetching user:", err.message);
            return res.status(500).json({ error: "Error fetching data", details: err.message });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(data[0]);
    });
};

// Update a user by ID
export const updateUser = (req, res) => {
    const { id } = req.params;
    const { usertype, first_name, last_name, username, NIC, email, contact } = req.body;

    if (!usertype || !first_name || !last_name || !username || !NIC || !email || !contact) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = 'UPDATE user SET usertype = ?, first_name = ?, last_name = ?, username = ?, NIC = ?, email = ?, contact = ? WHERE user_id = ?';
    db.query(sql, [usertype, first_name, last_name, username, NIC, email, contact, id], (error, results) => {
        if (error) {
            console.error("Error updating user:", error.message);
            return res.status(500).json({ message: "Database error", error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    });
};

// Delete a user by ID
export const deleteUser = (req, res) => {
    const sql = 'DELETE FROM user WHERE user_id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error("Error deleting user:", err.message);
            return res.status(500).json({ error: "Error deleting data", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    });
};
