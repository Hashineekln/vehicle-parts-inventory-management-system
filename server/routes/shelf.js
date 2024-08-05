// shelf.js
import express from 'express';
import { getShelfs, getShelf, addshelf, updateShelf } from '../controllers/shelf.js';

const router = express.Router();

router.get('/', getShelfs) 
router.get('/:id', getShelf)
router.post('/', addshelf)
router.put('/:id', updateShelf);


export default router;
