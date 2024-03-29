 import express from 'express';
 import mongoose from 'mongoose';

 import PostMessage from '../models/postMessage.js';

 const router = express.Router();

 export const getPosts = async (req, res) => {
    try{
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessages);

    }catch (error) {
        res.status(404).json({message: error.message});
        
    }
 }

 export const createPost= async(req, res) => {
    const { title, message, selectedFile, creator, tags} = req.body;

    const newPostMessage = new PostMessage({title, message, selectedFile, creator, tags})

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        req.status(409).json({message:error.message});
    }
 }

 export const updatePost = async (req, res) => {
    const {id} = req.params;
    const {title, message, creator, selectedFile, tags} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatePost = { creator, title, message, tages, selectedFile, _id: id};
    await PostMessage.findByIdAndUpdate(id, updatePost,)
 }

 export default router;