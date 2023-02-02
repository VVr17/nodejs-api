import * as dotenv from 'dotenv'; // to get variables from .env
import bcrypt from 'bcrypt'; // hash, encode password
import jwt from 'jsonwebtoken'; // JWT
import sgMail from '@sendgrid/mail'; // to send email
import sha from 'sha256';
import { User } from '../db/userModel.js';
import { Verification } from '../db/verificationModel.js';
import { NotAuthorizedError } from '../helpers/errors.js';

dotenv.config();
const { SENDGRID_API_KEY, JWT_SECRET, HOST_URL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

export const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();

  const code = sha(email + JWT_SECRET);
  const verification = new Verification({
    code,
    userId: user._id,
  });

  await verification.save();

  const message = {
    to: email,
    from: 'v.voronova.1117@gmail.com',
    subject: 'Email confirmation',
    text: `Please, confirm your email POST ${HOST_URL}/api/auth/registration_confirmation/${code}`,
    html: `Please, confirm your email POST ${HOST_URL}/api/auth/registration_confirmation/${code}`,
  };

  https: await sgMail.send(message);
};

export const registrationConfirmation = async code => {
  const verification = await Verification.findOne({ code, active: true });

  if (!verification) {
    throw new NotAuthorizedError(`Invalid or expired confirmation code`);
  }

  const user = await User.findById(verification.userId);

  if (!user) {
    throw new NotAuthorizedError(`no user found`);
  }

  verification.active = false;
  await verification.save();

  user.confirmed = true;
  await user.save();

  const message = {
    to: user.email,
    from: 'v.voronova.1117@gmail.com',
    subject: 'Thank you for registration',
    text: "You've been successfully registered",
    html: "<h1>You've been successfully registered</h1>",
  };

  await sgMail.send(message);
};

export const forgotPassword = async email => {
  const user = await User.findOne({ email, confirmed: true });

  if (!user) {
    throw new NotAuthorizedError(`no user with email: ${email} found`);
  }

  const password = sha(Date.now() + JWT_SECRET);

  user.password = password;
  await user.save();

  const message = {
    to: user.email,
    from: 'v.voronova.1117@gmail.com',
    subject: 'Password forgot',
    text: `Here is your temporary password: ${password}`,
    html: `Here is your temporary password: ${password}`,
  };

  await sgMail.send(message);
};

export const login = async (email, password) => {
  const user = await User.findOne({ email, confirmed: true });

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
