import Joi from 'joi';

export const userLoginValidator = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(5).max(255).required(),
});

export const UserRegistrationValidator = Joi.object({
  name: Joi.string().trim().min(4).max(100).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string().trim().required(),
  password: Joi.string().trim().min(5).max(255).required(),
  userType: Joi.string(),
});
