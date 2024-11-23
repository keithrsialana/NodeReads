import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../../.env');
dotenv.config({path: envPath});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nodereads';

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed');
    }
};

export default db;
