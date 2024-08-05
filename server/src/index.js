import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import notificationRoutes from '../routes/notification.js';
import { setIOInstance } from '../controllers/notification.js'; // Import setIOInstance
import router from '../routes/product.js';
import apiRouter from '../routes/cartstate.js';
import reportRoutes from '../routes/report.js';
import reportyearRoutes from '../routes/reportyear.js';
import returnRoutes from '../routes/return.js'; //return recipt 
 


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
app.use('/api', apiRouter);

// Socket.IO setup
setIOInstance(io); // Set the io instance

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Import and use other routes
import productRoutes from '../routes/product.js';

import authRoutes from '../routes/auth.js';
import clientRoutes from '../routes/client.js';
import shelfRoutes from '../routes/shelf.js';
import vehiclepartRoutes from '../routes/vehiclepart.js';
import categoryRoutes from '../routes/category.js';
import vehicletypeRoutes from '../routes/vehicletype.js';

import userRoutes from '../routes/user.js';
import returntableRoutes from '../routes/returntable.js';

import roleRoutes from '../routes/role.js';
import billRoutes from '../routes/bill.js';
import cartstateRoutes from '../routes/cartstate.js';
import supplierRoutes from '../routes/supplier.js';
import transactionRoutes from '../routes/transaction.js';
import billdetailsRoutes from '../routes/billdetails.js';







app.use('/product', productRoutes);
app.use('/auth', authRoutes);

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
app.use('/api', notificationRoutes);
app.use('/api', userRoutes);
app.use('/api', billdetailsRoutes);
app.use('/api/reportyear', reportyearRoutes);
app.use('/api', returntableRoutes);

app.use('/api', reportRoutes);
app.use('/api/returnitem', returnRoutes);


io.on('connection', (socket) => {
  console.log('Notification Available');
  socket.on('disconnect', () => {
    console.log('Notification Not Available');
  });
});

// Port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
