import jwt from 'jsonwebtoken'; // JWT
import { NotAuthorizedError } from '../helpers/errors.js';

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(new NotAuthorizedError('Please, provide a token'));
    }

    const [tokenType, token] = authorization.split(' ');

    if (!token) {
      next(new NotAuthorizedError('Please, provide a token'));
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(error.message);
  }
};

export default authMiddleware;
