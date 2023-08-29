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


app.listen(Port, () => console.log(chalk.blueBright(`Server is upto ${Port}`)))