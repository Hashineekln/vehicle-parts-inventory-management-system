// routes/notification.js
import express from 'express';
import { checkThresholds } from '../controllers/notification.js';

const router = express.Router();

router.get('/notifications', (req, res) => {
    checkThresholds(req, res);
});

//router.post('/suppress', suppressNotification);

export default router;
