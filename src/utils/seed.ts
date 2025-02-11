import mongoose from 'mongoose';
import User from '../models/User.js';
import Thought from '../models/Thought.js';
import { users, thoughts } from './data.js';
import cleanDB from './cleanDB.js';
import db from '../config/connection.js';

const seedDB = async () => {
    try {
        await db();
       //await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB');
        console.log('Database connected.');

        await cleanDB();

        await User.insertMany(users);
        console.log('Users seeded.');

        await Thought.insertMany(thoughts);
        console.log('Thoughts seeded.');

        console.log('Database seeding completed.');
        mongoose.connection.close();
    } catch (error) {
        console.error('Database seeding error:', error);
        mongoose.connection.close();
    }
};

seedDB();