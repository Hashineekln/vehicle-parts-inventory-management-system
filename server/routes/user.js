import express from 'express';
import { getUsers, getUser,updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);


export default router;


