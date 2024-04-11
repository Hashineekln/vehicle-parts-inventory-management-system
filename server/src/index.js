
//import cors from 'cors';
import express from 'express';
import reportRoutes from '../routes/report.js';
import authRoutes from '../routes/auth.js';
import userRoutes from '../routes/user.js';
import roleRoutes from '../routes/role.js';
import cookieParser from 'cookie-parser';

const app = express();

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

// Port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
