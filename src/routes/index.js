import { Router } from 'express';
import usuariosRouter from './users.router.js';
import authRouter from './auth.router.js';
import mailRouter from "./mail.router.js"
import smsRouter from "./sms.router.js"

const route = Router();

route.use('/usuarios', usuariosRouter);
route.use('/auth', authRouter);
route.use('/mail', mailRouter);
route.use('/sms', smsRouter );

export default route;
