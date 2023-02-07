import mongoose from 'mongoose';

const Review = mongoose.model(
  'Review',
  new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
      min: 5,
      max: 255,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

export default Review;
