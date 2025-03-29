import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config()

let url = process.env.MONGO_URL;  

const dbConnect = async () => {
    try {
        await mongoose.connect(url);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB connection error: " + error.message);
    }
};

export default dbConnect;