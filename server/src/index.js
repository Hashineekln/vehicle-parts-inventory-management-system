import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import router from '../routes/product.js';
import apiRouter from '../routes/cartstate.js';

// Import routes
import productRoutes from '../routes/product.js';
import reportRoutes from '../routes/report.js';
import authRoutes from '../routes/auth.js';
import clientRoutes from '../routes/client.js';
import shelfRoutes from '../routes/shelf.js';
import vehiclepartRoutes from '../routes/vehiclepart.js';
import categoryRoutes from '../routes/category.js';
import vehicletypeRoutes from '../routes/vehicletype.js';
import userRoutes from '../routes/user.js';
import roleRoutes from '../routes/role.js';
import billRoutes from '../routes/bill.js';
import cartstateRoutes from '../routes/cartstate.js';

import supplierRoutes from '../routes/supplier.js';
import transactionRoutes from '../routes/transaction.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
app.use('/api', apiRouter);



// API Routes
app.use('/product', productRoutes);
app.use('/server/report', reportRoutes);
app.use('/auth', authRoutes);
app.use('/server/user', userRoutes);
app.use('/server/role', roleRoutes);
app.use('/client', clientRoutes);
app.use('/category', categoryRoutes);
app.use('/vehicletype', vehicletypeRoutes);
app.use('/shelf', shelfRoutes);
app.use('/vehiclepart', vehiclepartRoutes);
app.use('/supplier', supplierRoutes);
app.use('/transaction', transactionRoutes);
app.use('/bill', billRoutes);
app.use('/cartstate', cartstateRoutes);







// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
