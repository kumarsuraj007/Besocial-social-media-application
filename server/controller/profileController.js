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

// export const userProfile = asyncHandler(async (req, res) => {
//     // try {
//         // Find the user by ID and exclude the password field
//         const findUser = await userModelSchema.findOne({ _id: req.params.id }).select('-password');

//         // If user not found, return a 404 response
//         if (!findUser) {
//             return res.status(404).json({ error: 'User not found!' });
//         }

//         // Find posts by the user and populate the 'postedBy' field with user details
//         const postedByUser = await postModelSchema.find({ postedBy: req.params.id }).populate('postedBy', '_id username');

//         // Return the user and their posts
//         res.status(200).json({ user: findUser, posts: postedByUser });
//     // } catch (error) {
//         // Handle any errors that might occur during the execution
//     //     res.status(500).json({ error: 'Internal server error' });
//     // }
// });


