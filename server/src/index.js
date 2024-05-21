import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

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

import supplierRoutes from '../routes/supplier.js';
import transactionRoutes from '../routes/transaction.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app build directory
//const __dirname = path.resolve();
//app.use(express.static(path.join(__dirname, 'client/dist')));

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

// All remaining requests return the React app, so it can handle routing
//app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
//});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
