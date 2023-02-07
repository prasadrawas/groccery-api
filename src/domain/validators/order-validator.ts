import Joi from 'joi';

const OrderValidator = Joi.object({
  quantity: Joi.number().min(1).max(255).required(),
  expectedDelivery: Joi.date(),
  totalPrice: Joi.number().min(1).max(5000).required(),
  deliveryStatus: Joi.string().trim().required(),
});

export default OrderValidator;
