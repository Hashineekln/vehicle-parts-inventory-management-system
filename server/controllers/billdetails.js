import db from '../db.js';

export const getBills = async (req, res) => {
    const sql = `
        SELECT b.bill_id, b.user_user_id, b.customer_customer_id, b.total_amount, b.total_discount, 
               b.invoice_date, b.warranty_date, 
               GROUP_CONCAT(bi.vehicle_part_part_no) AS part_nos, 
               GROUP_CONCAT(bi.vehicle_part_part_name) AS part_names, 
               GROUP_CONCAT(bi.selling_price) AS selling_prices, 
               GROUP_CONCAT(bi.selling_quantity) AS selling_quantities
        FROM bill b
        JOIN bill_item bi ON b.bill_id = bi.bill_bill_id
        GROUP BY b.bill_id
    `;
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

export const getBill = async (req, res) => {
    const sql = `
        SELECT b.bill_id, b.user_user_id, b.customer_customer_id, b.total_amount, b.total_discount, 
               b.invoice_date, b.warranty_date, 
               GROUP_CONCAT(bi.vehicle_part_part_no) AS part_nos, 
               GROUP_CONCAT(bi.vehicle_part_part_name) AS part_names, 
               GROUP_CONCAT(bi.selling_price) AS selling_prices, 
               GROUP_CONCAT(bi.selling_quantity) AS selling_quantities
        FROM bill b
        JOIN bill_item bi ON b.bill_id = bi.bill_bill_id
        WHERE b.bill_id = ?
        GROUP BY b.bill_id
    `;
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};

