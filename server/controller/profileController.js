import userModelSchema from '../model/userModel.js'
import postModelSchema from "../model/postModel.js";
import asyncHandler from "express-async-handler";

export const userProfile = asyncHandler(async(req, res) => {
    const findUser = await userModelSchema.findOne({_id:req.params.id})
    .select("-password");

    if(!findUser) {
       return res.status(400).json({error: 'User not found!'})
    }
    const postedByUser = await postModelSchema.find({postedBy:req.params.id})
        .populate("postedBy", "_id username")
        res.status(200).json({findUser, postedByUser})
})