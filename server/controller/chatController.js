import chatModelSchema from '../model/chatModel.js';
import asyncHandler from 'express-async-handler'

export const createChat = asyncHandler(async(req, res) => {
    const newChat = new chatModelSchema({
        members: [req.body.senderId, req.body.receiverId]
    });

    const result = await newChat.save();
    res.status(200).json(result)
});

export const userChats = asyncHandler(async(req, res) => {
    const chat = await chatModel.find({
        members: {$in: [req.params.userId]}
    });

    res.status(200).json(chat)
})

export const findChat = asyncHandler(async(req, res) => {
    const chat = await chatModelSchema.findOne({
        members: {$all: [req.params.firstId, req.params.secondId]}
    });
    res.status(200).json(chat)
})