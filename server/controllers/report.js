

import db from '../db.js';

export const getCategoryCount = async (req, res) => {
    const sql = 'SELECT COUNT(*) AS count FROM category';
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data[0]);
    });
};

export const getPartCount = async (req, res) => {
    
        const sql = 'SELECT COUNT(DISTINCT part_no) AS count FROM vehicle_part';
        db.query(sql, (err, data) => {
            if (err) return res.json({ error: "Error fetching data" });
            return res.json(data[0]);
        });
    };
    

    export const getTopSellingParts = async (req, res) => {
        const sql = `
            SELECT vehicle_part_part_no, SUM(selling_quantity) AS total_quantity
            FROM bill_item
            WHERE bill_bill_id IN (
                SELECT bill_id
                FROM bill
                WHERE invoice_date >= NOW() - INTERVAL 30 DAY
            )
            GROUP BY vehicle_part_part_no
            ORDER BY total_quantity DESC
            LIMIT 5
        `;
        db.query(sql, (err, data) => {
            if (err) return res.json({ error: "Error fetching data" });
            return res.json(data);
        });
    };
    
