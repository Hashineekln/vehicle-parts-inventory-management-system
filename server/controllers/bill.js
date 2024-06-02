import db from '../db.js';

export const createBill = async (req, res) => {
    const { total_amount, total_discount, invoice_date, warranty_date, user_user_id, customer_customer_id } = req.body;
  
    // Define the insert query
    const insertQuery = `
      INSERT INTO bill (total_amount, total_discount, invoice_date, warranty_date, user_user_id, customer_customer_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    // Values to insert
    const values = [total_amount, total_discount, invoice_date, warranty_date, user_user_id, customer_customer_id];
  
    try {
      // Insert the bill into the database
      db.query(insertQuery, values, (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Error inserting bill:', insertErr);
          return res.status(500).json({ error: 'Error inserting bill' });
        }
  
        // Retrieve the last inserted ID
        db.query('SELECT LAST_INSERT_ID() as bill_id', (idErr, idResults) => {
          if (idErr) {
            console.error('Error retrieving last insert ID:', idErr);
            return res.status(500).json({ error: 'Error retrieving last insert ID' });
          }
  
          const billId = idResults[0].bill_id;
          console.log('Inserted Bill ID:', billId);
          res.status(201).json({ bill_id: billId });
        });
      });
    } catch (error) {
      console.error('Error creating bill:', error);
      res.status(500).json({ error: 'Failed to create bill' });
    }
  };

  // Function to insert a new bill item
  export const createBillItem = async (req, res) => {
    const { billId } = req.params;
    const { vehicle_part_part_no, vehicle_part_part_name, selling_price, selling_quantity } = req.body;

    console.log('Received data:', { billId, vehicle_part_part_no, vehicle_part_part_name, selling_price, selling_quantity });

    try {
        await db.query(`
            INSERT INTO bill_item (bill_bill_id, vehicle_part_part_no, vehicle_part_part_name, selling_price, selling_quantity)
            VALUES (?, ?, ?, ?, ?)
        `, [billId, vehicle_part_part_no, vehicle_part_part_name, selling_price, selling_quantity]);
        
        // Update the quantity in the vehicle_part table
        await db.query(`
        UPDATE vehicle_part
        SET quantity = quantity - ?
        WHERE part_no = ?
      `, [selling_quantity, vehicle_part_part_no]);
  
      res.sendStatus(201);
    } catch (error) {
      console.error('Error creating bill item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
