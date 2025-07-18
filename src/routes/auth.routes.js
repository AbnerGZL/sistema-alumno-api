import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export default router;
