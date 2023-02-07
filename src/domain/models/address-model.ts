import mongoose from 'mongoose';

const Address = mongoose.model(
  'Address',
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      min: 4,
      max: 50,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      length: 10,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      length: 6,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true,
    },
    house: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      trim: true,
    },
  })
);

export default Address;
