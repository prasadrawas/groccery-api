import mongoose from 'mongoose';
require('dotenv').config();

const connectToMongo = (isLocal?: boolean) => {
  mongoose.set('strictQuery', false);
  if (isLocal) {
    mongoose
      .connect(`${process.env.MONGO_LOCAL_URL}`)
      .then(() => console.log('Database connection Success'))
      .catch((err) => console.log('Database connected Failed: ' + err.message));
  } else {
    mongoose
      .connect(`${process.env.MONGO_CLOUD_URL}`)
      .then(() => console.log('Database connection Success'))
      .catch((err) => console.log('Database connected Failed: ' + err.message));
  }
};

export default connectToMongo;
