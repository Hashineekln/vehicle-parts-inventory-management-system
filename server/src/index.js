
import reportRoutes from '../routes/report.js'
import authRoutes from '../routes/auth.js'
import userRoutes from '../routes/user.js'
import roleRoutes from '../routes/role.js'

import express from 'express';


const app = express();

//middleware
app.use(express.json());

app.use("/server/report", reportRoutes);
app.use("/server/auth", authRoutes);
app.use("/server/user", userRoutes);
app.use("/server/role", roleRoutes);





//port
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});