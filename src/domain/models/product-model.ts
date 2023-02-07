import mongoose from 'mongoose';
const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    title: {
      type: String,
      minlength: 4,
      trim: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      minlength: 4,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: String,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    retailPrice: {
      type: Number,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4,
    },
    reviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    stock: {
      type: Number,
      min: 0,
      default: 10,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
  })
);

export default Product;
