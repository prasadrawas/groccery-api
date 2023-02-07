import mongoose from 'mongoose';
const Cart = mongoose.model(
  'Cart',
  new mongoose.Schema({
    userId: {
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
  })
);

export default Cart;
