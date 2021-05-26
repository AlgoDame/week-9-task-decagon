import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongodb = new MongoMemoryServer;



export async function testConnectDB() {
    const uri = await mongodb.getUri();
    const mongooseOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    };

    await mongoose.connect(uri, mongooseOptions)
        .then(() => console.log("Connected to Database"))
        .catch(e => console.log(e.message))
};



export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongodb.stop();
}

