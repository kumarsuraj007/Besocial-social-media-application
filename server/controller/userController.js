import userSchema from '../model/userModel.js'
import asyncHandler from 'express-async-handler'
import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Require custom path 
import {resolve} from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import env file
import dotenv from 'dotenv';
dotenv.config({ path: resolve(__dirname, '../config/.env') });
const secret_key = process.env.JWT_SECRET;

export const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password, pic} = req.body;
    const existingUserEmail = await userSchema.findOne({email: email});
    if(existingUserEmail) {
        return res.status(409).json({error: 'This Email is already registered'})
    }

    const userName = await userSchema.findOne({username: username});
    if(userName) {
        return res.status(409).json({error: 'This username is already in use'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const saveUser = await userSchema.create({
        username,
        email,
        password:hashedPassword,
        photo:pic
    });
    res.status(200).json({message: 'User registered successfully!'})
});

export const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const existingUserEmail = await userSchema.findOne({email: email});
    if(!existingUserEmail) {
        return res.status(409).json({error: 'Email and password are incorrect!'})
    }
    const comparePassword = await bcrypt.compare(password, existingUserEmail.password)
    if(comparePassword) {
        const token = await Jwt.sign({
            _id: existingUserEmail.id
        }, secret_key)
        const {_id, username, photo, followers, following} = existingUserEmail
        res.json({message: 'Successfully Login', token, user:{_id, username, photo, followers, following}})
    } else {
        return res.status(400).json({error: 'Email and password are incorrect!'}) 
    }
});


export const updateUser = asyncHandler(async(req, res) => {
    const userId = req.params.id
    const {username, body, pic} = req.body
    const updateUser = await userSchema.findByIdAndUpdate(userId, {
        username,
        body,
        photo:pic
    }, {
        new: true
    }).populate("username")
    if (!updateUser) {
        return res.status(400).json({message: "User not found"})
    }
    res.status(200).json({message: 'Profile updated successfully', updateUser})
});


export const followUser = asyncHandler(async(req, res) => {
        // Update the user being followed
        const followedUser = await userSchema.findByIdAndUpdate(
          req.body.followId,
          { $push: { followers: req.user._id } },
          { new: true }
        );
    
        if (!followedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Update the current user's following list
        const currentUser = await userSchema.findByIdAndUpdate(
          req.user._id,
          { $push: { following: req.body.followId } },
          { new: true }
        ).select('-password');
    
        res.status(200).json(currentUser);
})

export const unFollowUser = asyncHandler(async(req, res) => {
    // Update the user being followed
    const unFollowedUser = await userSchema.findByIdAndUpdate(
      req.body.unFollowId,
      { $pull: { followers: req.user._id } },
      { new: true }
    );

    if (!unFollowedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the current user's following list
    const currentUser = await userSchema.findByIdAndUpdate(
      req.user._id,
      { $pull: { following: req.body.unFollowId } },
      { new: true }
    ).select('-password');

    res.status(200).json(currentUser);
})

//get friends
// export const getFriends = asyncHandler(async (req, res) => {
//       const user = await userSchema.findById(req.params.userId);
//       const friends = await Promise.all(
//         userSchema.following?.map((friendId) => {
//           return userSchema.findById(friendId);
//         })
//       )
//       let friendList = [];
//       friends?.map((friend) => {
//         const { _id, username, profilePicture } = friend;
//         friendList.push({ _id, username, profilePicture });
//       });
//       res.status(200).json(friendList)
//   })

export const getFriends = asyncHandler(async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friends = await Promise.all(
      (user.following || []).map(async (friendId) => {
        const friend = await userSchema.findById(friendId);
        return friend;
      })
    );

    const friendList = friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      return { _id, username, profilePicture };
    });

    res.status(200).json(friendList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
