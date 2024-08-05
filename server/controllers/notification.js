import db from '../db.js';

let ioInstance;

export const setIOInstance = (io) => {
    ioInstance = io;
};

export const checkThresholds = (req, res) => {
    const io = req ? req.io : ioInstance;
    db.query('SELECT * FROM vehicle_part', (error, results) => {
        if (error) throw error;
        results.forEach(part => {
            if (part.quantity < part.threshold_no) {
                io.emit('notification', {
                    partId: part.part_no,
                    partName: part.part_name,
                    quantity: part.quantity,
                    threshold: part.threshold_no
                });
            }
        });
    });
    if (res) {
        res.status(200).send('Thresholds checked');
    }
};


setInterval(() => {
    checkThresholds(null, null);
}, 24 * 60 * 60 * 1000); // Check every 24 hours
