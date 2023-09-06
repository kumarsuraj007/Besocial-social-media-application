import asyncHandler from 'express-async-handler'
import messageModelSchema from '../model/messageModel.js'

export const addMessage = asyncHandler(async(req, res) => {
    const newMessage = messageModelSchema(req.body)
    const result = await newMessage.save()
    res.status(200).json(result)
});

export const getMessages = asyncHandler(async(req, res) => {
const {chatId} = req.params;
const result = await messageModelSchema.find({chatId})
res.status(200).json(result)
})
