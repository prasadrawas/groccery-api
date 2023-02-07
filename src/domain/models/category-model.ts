import mongoose from 'mongoose';
const Category = mongoose.model(
  'Category',
  new mongoose.Schema({
    title: {
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

export default Category;
