import Joi from 'joi';

const WishlistValidator = Joi.object({
  userId: Joi.string().trim().required(),
  product: Joi.string().trim().required(),
  createdAt: Joi.date(),
});

export default WishlistValidator;
