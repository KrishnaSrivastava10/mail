import mongoose from "mongoose"

const Connection = async () => {
  const DB_URI = `mongodb+srv://krishna0mail0project:krishna123@mail.ynxqzud.mongodb.net/?retryWrites=true&w=majority&appName=mail`;
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.log("Error while connecting with the database", error.message);
  }
};


export default Connection;