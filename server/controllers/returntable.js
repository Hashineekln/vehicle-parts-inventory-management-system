//return table display

import db from '../db.js';

export const getReturnitems = async (req, res) => {
    const sql = 'SELECT * FROM return_item';
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: "Error fetching data" });
        return res.json(data);
    });
};


