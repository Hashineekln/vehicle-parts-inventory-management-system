import express from 'express';
import { getCategorys, getCategory, addCategory, updateCategory, deleteCategory } from '../controllers/category.js';
//check whter to include verufy tokens
const router = express.Router();

router.get('/', getCategorys) 
router.get('/:id', getCategory)
router.post('/', addCategory)
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory)

export default router;