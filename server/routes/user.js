import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
