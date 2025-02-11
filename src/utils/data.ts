import { Types } from 'mongoose';

export const users = [
    {
        _id: new Types.ObjectId(),
        username: 'john_doe',
        email: 'john@example.com',
        thoughts: [],
        friends: []
    },
    {
        _id: new Types.ObjectId(),
        username: 'jane_doe',
        email: 'jane@example.com',
        thoughts: [],
        friends: []
    }
];

export const thoughts = [
    {
        _id: new Types.ObjectId(),
        thoughtText: 'This is a thought by John.',
        username: 'john_doe',
        createdAt: new Date(),
        reactions: []
    },
    {
        _id: new Types.ObjectId(),
        thoughtText: 'This is a thought by Jane.',
        username: 'jane_doe',
        createdAt: new Date(),
        reactions: []
    }
];