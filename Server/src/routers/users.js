import express, { Router } from 'express';
import verifyToken from '../middleware/auth.js';
import {getUsers, getUserId , createUsers, updateUser, deleteUser, updateStatus} from '../controller/user.js'
const router = express.Router()

router.get('/all', getUsers);

router.get('/id/:id', getUserId)

router.post('/add', createUsers);

router.patch('/update/:id', updateUser);

router.patch('/update/status/:id', updateStatus);

router.delete('/delete/:id', deleteUser);

export default router;