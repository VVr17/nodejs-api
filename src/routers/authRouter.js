import express from 'express';
import authController from '../controllers/authController.js';
import { asyncWrapper } from '../helpers/apiHelpers.js';

const { loginController, registrationController } = authController;

const router = new express.Router();

router.post('/registration', asyncWrapper(registrationController));
router.post('/login', asyncWrapper(loginController));

export default router;
