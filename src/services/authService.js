import bcrypt from 'bcrypt'; // hash, encode password
import jwt from 'jsonwebtoken'; // JWT
import { User } from '../db/userModel.js';
import { NotAuthorizedError } from '../helpers/errors.js';

export const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError(`no user with email: ${email} found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );

  return token;
};
