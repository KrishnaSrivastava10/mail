import mongoose from "mongoose"
import 'dotenv/config';

const Connection = async () => {
  const DB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.log("Error while connecting with the database", error.message);
  }
};


export default Connection;