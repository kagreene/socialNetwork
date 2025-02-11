import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document{
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[]; //should reference thoughts model
    friends: Schema.Types.ObjectId[]; //should reference user model
}

const userSchema = new Schema<IUser>({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid e-mail address']
        //Match email pattern
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{
    toJSON: {
        virtuals: true,
    }
});

//Virtual that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

//Initialize user model
const User = model<IUser>('User', userSchema);

export default User;