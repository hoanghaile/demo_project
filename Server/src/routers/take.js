import express, { Router } from 'express';
import { getTakeAll, getTakeId, createTake, updateTake, deleteTake, updateStatus } from '../controller/take.js';
const router = express.Router();

router.get('/all', getTakeAll);

router.get('/id/:id', getTakeId);

router.post('/add', createTake);

router.patch('/update/:id', updateTake);

router.patch('/update/status/:id', updateStatus)

router.delete('/delete/:id', deleteTake);

export default router;