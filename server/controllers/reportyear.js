import db from '../db.js';

export const getReport = async (req, res) => {
    try {
        // Query for Total Revenue
        const totalRevenueQuery = `
            SELECT SUM(total_amount) AS total_revenue
            FROM bill 
            WHERE bill_id NOT BETWEEN 1 AND 33;
        `;

        // Updated Query for Total Buying Cost
        const totalBuyingCostQuery = `
            SELECT SUM(transaction_cost) AS total_buying_cost
            FROM (
                SELECT (quantity * buying_price) AS transaction_cost
                FROM transaction
            ) AS subquery;
        `;

        // Corrected Query for Total Return Cost
        const totalReturnCostQuery = `
            SELECT SUM(r.quantity * t.buying_price) AS total_return_cost
            FROM return_item r
            JOIN transaction t ON r.vehicle_part_part_no = t.vehicle_part_part_no
            WHERE r.type = 'defected';
        `;

        // Query for Total Inventory in Hand Value
        const totalInventoryInHandQuery = `
            SELECT SUM(sell_to) AS inventory_in_hand 
            FROM (
                SELECT (quantity * price) AS sell_to
                FROM vehicle_part
            ) AS subquery;
        `;

        // Query for Total Quantity in Hand inventory count
        const totalQuantityQuery = `
            SELECT SUM(quantity) AS total_quantity
            FROM vehicle_part;
        `;


        
        // Query for Total sold Quantity in Hand count
        const totalSoldQuantityQuery = `
            SELECT SUM(selling_quantity) AS total_sold_quantity
            FROM bill_item;
        `;

        
        // Query for Total Quantity in Hand as defected itens
        const totalReturnQuantityQuery = `
            SELECT SUM(quantity) AS total_return_quantity
            FROM return_item
            Where type = 'defected';
        `;

        // Query for Total Quantity from supplliers
        const totalBuyQuantityQuery = `
            SELECT SUM(quantity) AS total_buy_quantity
            FROM transaction;
            
        `;



        // Execute all queries in parallel
        const [totalRevenueResult, totalBuyingCostResult, totalReturnCostResult, totalInventoryInHandResult, totalQuantityResult,totalSoldQuantityResult,totalReturnQuantityResult,totalBuyQuantityResult] = await Promise.all([
            new Promise((resolve, reject) => db.query(totalRevenueQuery, (err, data) => err ? reject(err) : resolve(data))),
            new Promise((resolve, reject) => db.query(totalBuyingCostQuery, (err, data) => err ? reject(err) : resolve(data))),
            new Promise((resolve, reject) => db.query(totalReturnCostQuery, (err, data) => err ? reject(err) : resolve(data))),
            new Promise((resolve, reject) => db.query(totalInventoryInHandQuery, (err, data) => err ? reject(err) : resolve(data))),
            new Promise((resolve, reject) => db.query(totalQuantityQuery, (err, data) => err ? reject(err) : resolve(data))),
            new Promise((resolve, reject) => db.query(totalSoldQuantityQuery, (err, data) => err ? reject(err) : resolve(data))),
            new Promise((resolve, reject) => db.query(totalReturnQuantityQuery, (err, data) => err ? reject(err) : resolve(data))),
           
            new Promise((resolve, reject) => db.query(totalBuyQuantityQuery, (err, data) => err ? reject(err) : resolve(data))),


        ]);

        // Extract the values from the query results
        const totalRevenue = totalRevenueResult[0].total_revenue || 0;
        const totalBuyingCost = totalBuyingCostResult[0].total_buying_cost || 0;
        const totalReturnCost = totalReturnCostResult[0].total_return_cost || 0;
        const inventoryInHand = totalInventoryInHandResult[0].inventory_in_hand || 0;
        const quantityInHand = totalQuantityResult[0].total_quantity || 0;
        const quantitySold = totalSoldQuantityResult[0].total_sold_quantity || 0;
        const quantityReturn = totalReturnQuantityResult[0].total_return_quantity || 0;
        const quantityBuy = totalBuyQuantityResult[0].total_buy_quantity || 0;


        // Calculate total cost and total profit
        const totalCost = totalBuyingCost + totalReturnCost;
        const totalProfit = totalRevenue - totalCost;

        // Send the response
        return res.status(200).json({
            total_revenue: totalRevenue,
            total_buying_cost: totalBuyingCost,
            total_return_cost: totalReturnCost,
            total_cost: totalCost,
            total_profit: totalProfit,
            inventory_in_hand: inventoryInHand,
            inventory_quantity: quantityInHand,
            inventory_sold_quantity: quantitySold,
            inventory_return_quantity: quantityReturn,
            inventory_buy_quantity: quantityBuy,

        });

    } catch (error) {
        console.error('Error fetching report data:', error);
        return res.status(500).json({ error: "Error fetching report data", details: error.message });
    }
};
