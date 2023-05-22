import { Router } from 'express'
import viewController from "../controllers/view.controller.js"
import { authenticated } from '../utils/auth.js';

const router = Router()

router.get('/', viewController.home)
router.get('/products', authenticated, viewController.products)
router.get('/products/:pid', viewController.productsId)
router.get('/carts', viewController.carts )
router.get('/carts/:cid', viewController.cartsId )
router.get('/register', viewController.register );
router.get('/users/:id', viewController.userId );
router.get('/login', viewController.login);
router.get('/perfil', authenticated, viewController.perfil );

export default router;
