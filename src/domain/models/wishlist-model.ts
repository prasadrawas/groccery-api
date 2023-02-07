import mongoose from 'mongoose';

const Wishlist = mongoose.model(
  'Wishlist',
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

export default Wishlist;
