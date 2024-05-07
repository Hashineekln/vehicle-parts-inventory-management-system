
//import cors from 'cors';
import express from 'express';
import cors from 'cors';

import reportRoutes from '../routes/report.js';
import authRoutes from '../routes/auth.js';
import clientRoutes from '../routes/client.js';
import shelfRoutes from '../routes/shelf.js';    



import categoryRoutes from '../routes/category.js';
import vehicletypeRoutes from '../routes/vehicletype.js';
import userRoutes from '../routes/user.js';
import roleRoutes from '../routes/role.js';

import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());

// Middleware

//app.use(cors({
   // origin: 'http://localhost:5174'}));

// Routes
app.use(express.json());
app.use(cookieParser());
app.use("/server/report", reportRoutes);
app.use("/auth", authRoutes);
app.use("/server/user", userRoutes);
app.use("/server/role", roleRoutes);
app.use("/client", clientRoutes);
app.use("/category", categoryRoutes);
app.use("/vehicletype", vehicletypeRoutes);
app.use("/shelf", shelfRoutes);

// Port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
