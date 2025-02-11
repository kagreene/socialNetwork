import { Schema, model, Types, type Document } from 'mongoose';

// Define the dateFormat function
const dateFormat = (timestamp: Date): string => {
    return timestamp.toISOString();
};

interface IReaction extends Document{
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Schema.Types.Date;
};

interface IThought extends Document{
    thoughtText: string;
    createdAt: Schema.Types.Date;
    username: string;
    reactions: Schema.Types.ObjectId[]; //should reference reactions model
};

const reactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
        get: (timestamp: Date) => dateFormat(timestamp),
    },
}, 
{
    toJSON: {
        virtuals: true,
        getters: true,
    }
});

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    }
});

//Virtual that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});
//use getter method to format timestamp on query
thoughtSchema.virtual('formattedCreatedAt').get(function(){
    return dateFormat(this.createdAt as unknown as Date);
})
//Initialize thought model
const Thought = model('Thought', thoughtSchema);    


export default Thought;