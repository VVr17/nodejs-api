import {
  registration,
  login,
  registrationConfirmation,
  forgotPassword,
} from '../services/authService.js';

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  await registration(email, password);

  res.status(200).json({ status: 'success' });
};

const registrationConfirmationController = async (req, res) => {
  const { code } = req.params;
  await registrationConfirmation(code);

  res.status(200).json({ status: 'success' });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);

  res.json({ status: 'success', token });
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  await forgotPassword(email);

  res.status(200).json({ status: 'success' });
};

export default {
  registrationController,
  registrationConfirmationController,
  loginController,
  forgotPasswordController,
};
