import { Router } from 'express';
import { sendMail } from '../controllers/mail.controller.js';

const route = Router();

route.get('/sendmail', sendMail)

export default route;