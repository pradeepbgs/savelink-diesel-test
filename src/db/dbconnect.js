import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient()

export const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log(`DB connected`);
    } catch (error) {
        console.log("MongoDB connection Failed: ", error);
        process.exit(1);
    }
}

