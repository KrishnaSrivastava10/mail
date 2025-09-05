import mongoose from "mongoose"


const Connection = () => {
    const DB_URI = `mongodb+srv://krishna0mail0project:krishna123@ynxqzud.mongodb.net/?retryWrites=true&w=majority&appName=mail`;
    try {
        mongoose.connect(DB_URI,{useNewUrlParser: true});
        console.log('Databse connected successfully');
    } catch (error) {
        console.log("Error while connecting with the database",error.message)
    }
} 

export default Connection;