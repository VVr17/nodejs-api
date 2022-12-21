// const Joi = require('joi');
import Joi from 'joi';

const addPostValidation = (req, res, next) => {
  // Joi validation
  const schema = Joi.object({
    topic: Joi.string().alphanum().min(3).max(20).required(),
    text: Joi.string().min(10).max(400).required(),
  });

  const {error} = schema.validate(req.body);
  if (error) {
    return res.status(400).json({status: error.details[0].message});
  }

  next();
};

export default addPostValidation;
