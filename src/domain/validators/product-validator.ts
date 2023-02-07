import Joi from 'joi';

const ProductValidator = Joi.object({
  title: Joi.string().trim().min(3).max(255).required(),
  category: Joi.string().trim().min(3).max(255).required(),
  description: Joi.string().trim().min(3).max(255).required(),
  brand: Joi.string().trim().min(3).max(255).required(),
  image: Joi.string().trim().uri().required(),
  weight: Joi.string().trim().min(3).max(255).required(),
  salePrice: Joi.number().min(1).max(1000).required(),
  retailPrice: Joi.number().min(1).max(1000),
  rating: Joi.number().min(0).max(5),
  reviews: Joi.number().min(0),
  stock: Joi.number().min(0),
  createdAt: Joi.date(),
  modifiedAt: Joi.date(),
});

export default ProductValidator;
