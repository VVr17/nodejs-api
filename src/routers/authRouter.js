import express from 'express';
import authController from '../controllers/authController.js';
import { asyncWrapper } from '../helpers/apiHelpers.js';

const {
  loginController,
  registrationController,
  registrationConfirmationController,
  forgotPasswordController,
} = authController;

const router = new express.Router();

router.post('/registration', asyncWrapper(registrationController));
router.post(
  '/registration_confirmation/:code',
  asyncWrapper(registrationConfirmationController)
);
router.post('/forgot_password', asyncWrapper(forgotPasswordController));
router.post('/login', asyncWrapper(loginController));

export default router;
