import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connection: string = <string>process.env.DATABASE_URI
export const connectDB = async () => {

     mongoose.connect(connection, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to mongoDb');
    }).catch(error => {
        console.log(error);

    })
}

