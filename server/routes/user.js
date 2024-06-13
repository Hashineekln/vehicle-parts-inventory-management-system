import express from 'express';
import { getUsers, getUser,updateUser, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
