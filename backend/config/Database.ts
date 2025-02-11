import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';

dotenv.config(); // load env variables

const mongoURI = process.env.MONGO_URI;
const connectDB = async (): Promise<void> => {
    if (!mongoURI) {
        throw new Error('MONGO_URI environment variable is not defined');
    }

    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;