import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';


//GET all users
export const getAllUsers = async(_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};

// GET a single user by its _id and populated thought and friend data
export const getUserById = async(req: Request, res: Response) => {
    const { userId } = req.params;
    try{
        const user = await User.findById(userId);
        if(user){
            res.json(user);
        } else {
            res.status(404).json({message: 'No user found with this id!'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};
//POST a new user: 
export const createUser = async(req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};

//PUT to update a user by its _id
export const updateUser = async(req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        const user = await User.findOneAndUpdate({_id: userId}, {$set: req.body}, {runValidators:true, new: true});
        if(user){
            res.json(user);
        } else {
            res.status(404).json({message: 'No user found with this id!'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};


//DELETE to remove user by its _id
export const deleteUser = async(req: Request, res: Response) => {
    const {userId} = req.params;
    try {
        const user = await User.findOneAndDelete({_id: userId});
        if(!user){
            res.status(404).json({message: 'No user found with this id!'});
        } else {
            //BONUS: Remove a user's associated thoughts when deleted.
            await Thought.deleteMany({_id: {$in: user.thoughts}});
            res.json({message: 'User deleted!'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};

//POST to add a new friend to a user's friend list
export const addFriend = async(req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findOneAndUpdate({_id: userId}, {$addToSet: {friends: friendId}}, {new: true});
        if(user){
            res.json(user);
        } else {
            res.status(404).json({message: 'No user found with this id!'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};

//DELETE to remove a friend from a user's friend list
export const removeFriend = async(req: Request, res: Response) => {
   const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, {$pull: {friends: friendId}}, {new: true});
        if(user){
            res.json(user);
        } else {
            res.status(404).json({message: 'No user found with this id!'});
        }
    } catch (error: any){
        res.status(500).json({message: error.message});
    }
};