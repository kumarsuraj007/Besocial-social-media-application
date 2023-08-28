import chalk from 'chalk';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

const connectDB = asyncHandler(async (err) => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.yellow(`mongodb connected: ${conn.connection.host}`));
    if (err) {
        console.log(`message: ${err.message}`);
        process.exit()
    }
});

export default connectDB;