import express from 'express';
import { sendmail, changePassword } from '../controller/mail.js';
import verifyToken from '../middleware/auth.js';
const router = express.Router();

router.post('/send-mail', sendmail);

router.post('/change-password', changePassword);

//router.post('/:userId/:token', passwordReset);

//router.post('/define-route', defineRoute);

export default router;