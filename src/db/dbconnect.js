import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}diesel-savelink`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.host}`);
    } catch (error) {
        console.log("MongoDB connection Failed: ", error);
        process.exit(1);
    }
}

