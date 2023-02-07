import Joi from 'joi';

const CategoryValidator = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  image: Joi.string().trim().uri().required(),
  createdAt: Joi.date(),
  modifiedAt: Joi.date(),
});

export default CategoryValidator;
