import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

//GET to get all thoughts
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
}
//GET to get a single thought by its _id
export const getThoughtById = async(req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if(thought){
            res.json(thought);
        } else {
            res.status(404).json({message: 'No thought found with this id!'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};

//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
export const createThought = async(req: Request, res: Response) => { 
    try{
    const thought = await Thought.create(req.body);
    await User.findOneAndUpdate({_id: req.body.userId}, {$push: {thoughts: thought._id}}, {new: true});
    res.json(thought);
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};

//PUT to update a thought by its _id
export const updateThought = async(req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate({_id: thoughtId}, {$set: req.body}, {runValidators: true, new: true});
        if(thought){
            res.json(thought);
        } else {
            res.status(404).json({message: 'No thought found with this id!'});
        }} catch (error: any){
            res.status(500).json({message: error.message})};
};
//DELETE to remove a thought by its _id
export const deleteThought = async(req: Request, res: Response) => {
    const {thoughtId} = req.params;
    try {
        const thought = await Thought.findOneAndDelete({_id:thoughtId}).populate('userId');
        if(thought){
            await User.findOneAndUpdate({_id: req.params.userId}, {$pull: {thoughts: thought._id}}, {new: true});
            res.json({message: 'Thought deleted'});
        } else {
            res.status(404).json({message: 'No thought found with this id!'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};

//POST to create a reaction stored in a single thought's reactions array field
export const createReaction = async(req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate({_id: thoughtId}, {$push: {reactions: req.body}}, {runValidators: true, new: true});
        if(thought){
            res.json(thought);
        } else {
            res.status(404).json({message: 'No thought found with this id!'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message})};
};

//DELETE to pull and remove a reaction by the reaction's reactionId value

export const deleteReaction = async(req: Request, res: Response) => {
    const {thoughtId, reactionId} = req.params;
    try {
        const thought = await Thought.findOneAndUpdate({_id:thoughtId}, {$pull: {reactions: {reactionId: reactionId}}}, {new: true});
        if(thought){
            res.json(thought);
        } else { 
            res.status(404).json({message: 'No thought found with this id!'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};