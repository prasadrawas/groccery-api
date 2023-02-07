import Joi from 'joi';

const CartValidator = Joi.object({
  userId: Joi.string().trim().required(),
  product: Joi.string().trim().required(),
  quantity: Joi.number().min(1).max(255),
});

export default CartValidator;
