import express from 'express';
import { getCategory, getCateId, createCategory, updateCategory, deleteCategory } from '../controller/category.js';

const router = express.Router()

router.get('/all', getCategory);

router.get('/id/:id', getCateId);

router.post('/add', createCategory);

router.patch('/update/:id', updateCategory);

router.delete('/delete/:id', deleteCategory);
    
export default router;