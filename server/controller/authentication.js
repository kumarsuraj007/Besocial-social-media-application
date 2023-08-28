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
    const {name, username, email, password} = req.body;
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
        name,
        username,
        email,
        password:hashedPassword
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
        const {_id, username} = existingUserEmail
        res.json({message: 'Successfully Login', token, user:{_id, username}})
    } else {
        return res.status(400).json({error: 'Email and password are incorrect!'}) 
    }
})