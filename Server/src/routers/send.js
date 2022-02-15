import express, { Router } from 'express';
import { getSendAll, getSendId, createSend, updateSend, deleteSend, updateStatus } from '../controller/send.js';
const router = express.Router();

router.get('/all', getSendAll);

router.get('/id/:id', getSendId);

router.post('/add', createSend);

router.patch('/update/:id', updateSend);

router.patch('/update/status/:id', updateStatus);

router.delete('/delete/:id', deleteSend);

export default router;