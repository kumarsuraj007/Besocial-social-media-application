import cors from 'cors'
import chalk from 'chalk';
import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const Port = process.env.PORT || 5000

import connectDb from './config/db.js'
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import profileRoute from './routes/profileRoute.js'
import chatRoute from './routes/chatRoute.js'
import messageRoute from './routes/messageRoute.js'
import videoRoute from './routes/videoRoute.js'

// Database connection 
dotenv.config({path: './config/.env'});
connectDb();

// Middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes 
app.use('/api/auth', userRoute)
app.use('/api/post', postRoute)
app.use('/api/profile', profileRoute)
app.use('/api/chat', chatRoute)
app.use('/api/messages', messageRoute)
app.use('/api/videos', videoRoute)




app.listen(Port, () => console.log(chalk.blueBright(`Server is upto ${Port}`)))