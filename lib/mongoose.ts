import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('MONGODB_URI is not set');

  if (isConnected) {
    console.log('=> using existing database connection');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log('Connected to database');
  } catch (error: any) {
    console.error('Error connecting to database: ', error.message);
  }
};
