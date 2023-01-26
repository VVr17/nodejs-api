// use for jest with ECMAScript Modules -->  NODE_OPTIONS=--experimental-vm-modules npx jest

import * as dotenv from 'dotenv'; // to get variables from .env
import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken'; // JWT
import authMiddleware from '../src/middlewares/authMiddleware';
import { NotAuthorizedError } from '../src/helpers/errors.js';

dotenv.config();

// test suite (several unit tests)
describe('Auth middleware test', () => {
  // unit test case
  it('should call next() and add user and token properties to req. object', () => {
    const user = {
      _id: '1233455645',
      email: 'email@email.com',
      createdAt: new Date().getTime(),
    };

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET
    );

    const mReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }; // fake Request

    const mRes = {}; // fake Response

    const mockNext = jest.fn();

    authMiddleware(mReq, mRes, mockNext);

    expect(mReq.token).toEqual(token);
    expect(mReq.user._id).toEqual(user._id);
    expect(mReq.user.email).toEqual(user.email);
    expect(mReq.user.createdAt).toEqual(user.createdAt);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should call next() with error in case authorization header is absent', () => {
    const mReq = { headers: {} }; // fake Request
    const mRes = {}; // fake Response
    const mockNext = jest.fn();

    authMiddleware(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new NotAuthorizedError('Please, provide a token')
    );
  });
});
