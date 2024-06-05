import db from '../db.js';

export const createReturn = (req, res) => {
    const { returnData, returnItems } = req.body;

    // Retrieve original quantities from the bill_item table
    const sqlGetBillDetails = `
        SELECT vehicle_part_part_no as part_no, selling_quantity 
        FROM bill_item 
        WHERE bill_bill_id = ?
    `;

    db.query(sqlGetBillDetails, [returnData.bill_bill_id], (err, billDetails) => {
        if (err) return res.status(500).json({ error: 'Error fetching bill details' });

        const originalQuantities = {};
        billDetails.forEach(item => {
            originalQuantities[item.part_no] = item.selling_quantity;
        });

        // Create a list of promises for each return item
        const promises = returnItems.map(item => {
            return new Promise((resolve, reject) => {
                if (item.return_quantity > 0) {
                    // Retrieve total returned quantity for the part from the return_item table
                    const sqlGetTotalReturned = `
                        SELECT SUM(quantity) as total_returned 
                        FROM return_item 
                        WHERE bill_bill_id = ? 
                        AND vehicle_part_part_no = ?
                    `;

                    db.query(sqlGetTotalReturned, [returnData.bill_bill_id, item.part_no], (err, result) => {
                        if (err) return reject({ error: 'Error fetching returned quantity' });

                        const totalReturned = result[0].total_returned || 0;
                        const remainingQuantity = originalQuantities[item.part_no] - totalReturned;

                        if (item.return_quantity > remainingQuantity) {
                            return reject({ error: `Return quantity for part ${item.part_no} exceeds the remaining quantity. Maximum allowed is ${remainingQuantity}.` });
                        }

                        // Insert return item into the return_item table
                        const sqlReturnItem = `
                            INSERT INTO return_item (bill_bill_id, vehicle_part_part_no, vehicle_part_part_name, price, quantity, type)
                            VALUES (?, ?, ?, ?, ?, ?)
                        `;
                        db.query(sqlReturnItem, [returnData.bill_bill_id, item.part_no, item.part_name, item.price, item.return_quantity, item.return_type], (err) => {
                            if (err) {
                                return reject({ error: 'Error inserting return items' });
                            }
                            
                            // If return type is Misconfig, update quantity in vehicle_part table
                            if (item.return_type === 'Misconfig') {
                                // Retrieve the vehicle_part_part_no from the return_item table
                                const sqlGetVehiclePartNo = `
                                    SELECT vehicle_part_part_no
                                    FROM return_item 
                                    WHERE bill_bill_id = ? AND vehicle_part_part_no = ?
                                `;
                                db.query(sqlGetVehiclePartNo, [returnData.bill_bill_id, item.part_no], (err, result) => {
                                    if (err) {
                                        return reject({ error: 'Error fetching vehicle part number from return_item table' });
                                    }
                                    const vehiclePartNo = result[0].vehicle_part_part_no;

                                    // Update quantity in vehicle_part table
                                    const sqlUpdateQuantity = `
                                        UPDATE vehicle_part 
                                        SET quantity = quantity + ?
                                        WHERE part_no = ?
                                    `;
                                    db.query(sqlUpdateQuantity, [item.return_quantity, vehiclePartNo], (err) => {
                                        if (err) {
                                            return reject({ error: 'Error updating quantity in vehicle_part table' });
                                        }
                                        resolve();
                                    });
                                });
                            } else {
                                resolve();
                            }
                        });
                    });
                } else {
                    resolve();
                }
            });
        });

        // Execute all promises
        Promise.all(promises)
            .then(() => {
                return res.json({ success: true });
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    });
};
