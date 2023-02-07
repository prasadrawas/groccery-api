import mongoose from 'mongoose';

const Order = mongoose.model(
  'Order',
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
      max: 255,
    },
    expectedDelivery: {
      type: Date,
      default: new Date().setDate(new Date().getDate() + 3),
    },
    totalPrice: {
      type: Number,
      default: 1,
      min: 1,
      max: 5000,
    },
    deliveryStatus: {
      type: String,
      enum: ['Preparing', 'Shipped', 'Delivered', 'Canceled'],
      default: 'Preparing',
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
  })
);

export default Order;
