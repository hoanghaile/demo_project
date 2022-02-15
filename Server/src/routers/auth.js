import express from 'express';
import { register, login,verifyAccount, show, getAdmin, getById, updateAdmin , deleteAdmin, updateStatus, changePass, mailChange  } from '../controller/auth.js';
import verifyToken from '../middleware/auth.js';
const router = express.Router();

router.get('/', verifyToken, show);

router.post('/register', register);

router.post('/login', login);

router.post('/verify', verifyAccount);

// router.get('/login', login);

router.get('/admin/all', getAdmin);

router.get('/admin/:id', getById);

router.patch('/admin/update/status/:id', updateStatus);

router.patch('/admin/update/:id', updateAdmin);

router.delete('/admin/delete/:id', deleteAdmin);

router.patch('/admin/change-pass/:id', changePass);

router.post('/admin/send-mail', mailChange);

export default router;
