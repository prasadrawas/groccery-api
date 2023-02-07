import express, { Router } from 'express';
import addressRouter from './address-route';
import authRouter from './auth-route';
import cartRouter from './cart-route';
import categoryRouter from './category-route';
import ordersRouter from './orders-route';
import productRouter from './products-route';
import wishlistRouter from './wishlist-route';

//Creating router instance
const router: Router = express.Router();
router.use('/api/auth', authRouter);
router.use('/api/category', categoryRouter);
router.use('/api/products', productRouter);
router.use('/api/cart', cartRouter);
router.use('/api/wishlist', wishlistRouter);
router.use('/api/address', addressRouter);
router.use('/api/orders', ordersRouter);

export default router;
