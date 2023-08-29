// Require Custom Path 
import {resolve} from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import Env File 
import dotenv from 'dotenv';
dotenv.config({path: resolve(__dirname, '../config/config.env')});
const secret_Key = process.env.JWT_SECRET;
import jwt from 'jsonwebtoken'

// Import UserModel 
import userSchema from '../model/userModel.js';

export const requireLoginAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if(!authorization) {
            return res.status(401).json({error: 'You must be logged in!'})
        }
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, secret_Key, (err, payload) => {
            if(err) {
                return res.status(401).json({error: 'You must be logged in!'}) 
            }
            const {_id} = payload;
            userSchema.findById(_id).then(userData => {
                req.user = userData;
                next();
            })
        }) 
    } catch (error) {
        res.status(400).json(error)
    }
}