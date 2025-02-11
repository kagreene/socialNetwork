import { User, Thought} from '../models/index.js';

const cleanDB = async (): Promise<void> => {
    try {
        await User.deleteMany({});
        console.log('Users cleaned.');
        await Thought.deleteMany({});
        console.log('Thoughts cleaned.');
    } catch (error) {
        console.error('Database cleaning error:', error);
        throw new Error('Database cleaning failed.');
    }
}

export default cleanDB;
