import Joi from 'joi';
import { ValidationError } from '../helpers/errors.js';

const addPostValidation = (req, res, next) => {
  // Joi validation
  const schema = Joi.object({
    topic: Joi.string().min(3).max(20).required(),
    text: Joi.string().min(10).max(400).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(JSON.stringify(error.details)));
  }

  next();
};

export default addPostValidation;
