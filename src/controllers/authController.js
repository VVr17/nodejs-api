import { registration, login } from '../services/authService.js';

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  await registration(email, password);

  res.status(200).json({ status: 'success' });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);

  res.json({ status: 'success', token });
};

export default {
  registrationController,
  loginController,
};
