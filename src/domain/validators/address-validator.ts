import Joi from 'joi';

const AddressValidator = Joi.object({
  userId: Joi.string().trim().required(),
  fullName: Joi.string().trim().min(4).max(30).required(),
  phone: Joi.string().trim().length(10).trim().required(),
  pincode: Joi.string().trim().length(6).required(),
  city: Joi.string().trim().min(3).max(20).required(),
  house: Joi.string().trim().min(5).max(20).required(),
  area: Joi.string().trim().min(5).max(20).required(),
});

export default AddressValidator;
