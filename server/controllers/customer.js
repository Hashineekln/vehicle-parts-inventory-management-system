const express = require('express');
const cors = require('cors');
const pool = require('./database'); // Ensure this connects to your MySQL database

const app = express();
app.use(cors());
app.use(express.json());

// Get all customers from the lhi_company.customer table
app.get('/customers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lhi_company.customer');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error: error.message });
  }
});

// POST endpoint to add a new customer
app.post('/customers', async (req, res) => {
  const { name, email, address, phone } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO lhi_company.customer (name, email, address, phone) VALUES (?, ?, ?, ?)', [name, email, address, phone]);
    res.status(201).json({ message: "Customer added", customerId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error adding customer", error: error.message });
  }
});

// Update customer data
app.put('/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, address, phone } = req.body;
  try {
    await pool.query('UPDATE lhi_company.customer SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?', [name, email, address, phone, id]);
    res.json({ message: "Customer updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error: error.message });
  }
});

// Delete a customer
app.delete('/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM lhi_company.customer WHERE id = ?', [id]);
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
