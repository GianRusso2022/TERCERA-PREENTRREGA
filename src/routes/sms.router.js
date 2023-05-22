import { Router } from 'express';
import { sendSms } from '../controllers/sms.controller.js';

const route = Router();

route.get('/sendsms', sendSms)

export default route;